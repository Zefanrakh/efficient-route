import { Connection } from 'src/domain/entities/connection.entity';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { GetRouteDto } from 'src/infrastructure/modules/road/dtos/get-route.dto';

export class GetEfficientRouteUseCase {
  constructor(
    private readonly roadRepository: RoadRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  /**
   * Executes the logic to find the most efficient route from a starting point to an endpoint.
   * @param {GetRouteDto} params - The route parameters including the start and end points.
   * @returns {Promise<string[]>} - A promise that resolves to an array of road names representing the route.
   * If no valid route is found, an empty array is returned.
   * @throws {Error} - Throws an error if an issue occurs during execution.
   */

  async execute(params: GetRouteDto): Promise<string[]> {
    const { start, end } = params;
    try {
      // Fetch vehicles
      const vehicles = await this.vehicleRepository.findAll();
      // Fetch roads
      const roads = await this.roadRepository.findAll();

      const vehicleLookup = Object.fromEntries(vehicles.map((v) => [v.id, v]));

      const startRoadData = roads.find((road) => road.id === Number(start));
      const endRoadData = roads.find((road) => road.id === Number(end));
      if (!startRoadData || !endRoadData) {
        return [];
      }

      const trafficValues: { [id: number]: number } = {};
      const previous: { [id: number]: number | null } = {};
      const notBeenPassed = new Set(roads.map((road) => road.id));
      const backReferer: number[] = []; // Array of road IDs where the distances of all their connections would be reversed

      // Initialize all distances to Infinity because we are looking for the shortest distance
      // or the least congestion. By starting with the maximum possible value (Infinity),
      // we ensure that any valid path will have a smaller value and thus be selected in comparisons.
      for (const node in roads) {
        trafficValues[node] = Infinity;
        previous[node] = null;
      }
      trafficValues[startRoadData.id] = 0;

      while (notBeenPassed.size > 0) {
        const currentRoadId = [...notBeenPassed].reduce((minNode, node) =>
          trafficValues[node] < trafficValues[minNode] ? node : minNode,
        );

        // Road have been passed, so delete from unpassed list
        notBeenPassed.delete(currentRoadId);

        if (currentRoadId === endRoadData.id) break;

        const currentNodeData = roads.find(
          (road) => road.id === currentRoadId,
        )!;

        // If currentnode included in backReferer, so all connection distance be made reversed
        let currentNodeConnections = currentNodeData.connections ?? [];
        if (backReferer.includes(currentNodeData.id)) {
          const maxDistanceConnectedToIteratedRoad = Math.max(
            ...currentNodeConnections.map((c) => c.distance_value),
          );
          currentNodeConnections = currentNodeConnections.map((c) => ({
            ...c,
            distance_value:
              maxDistanceConnectedToIteratedRoad + 1 - c.distance_value,
          }));
        }

        // Searching for connections from other roads that are not stored in the currentNode connections
        const connectionByOthers = new Map<number, Connection>();
        for (const connection of roads) {
          // Variable of distance that indicating that the road being iterated is actually a neighbor of the current node
          let connectionAsNeighbourDistance = null;

          const isConnectedData = connection.connections.find(
            (c) => c.road_id === currentNodeData.id,
          );
          if (isConnectedData) {
            /* If the road being iterated is indeed a neighbor of the current node,
             * assign its distance to the variable connectionAsNeighbourDistance.
             * If the connection is referenced in reverse, the distance value applied is also reversed,
             * proportional to the maximum distance value of the road that is making the reference.
             */
            connectionAsNeighbourDistance = isConnectedData.distance_value;

            connectionByOthers.set(connection.id, {
              road_id: connection.id,
              distance_value: connectionAsNeighbourDistance,
            });
            backReferer.push(connection.id);
          }
          for (const connectionNeighbour of connection.connections) {
            if (
              connectionAsNeighbourDistance ===
              connectionNeighbour.distance_value
            ) {
              /* If there is another neighbour road (of the road being iterated)
               * with the same distance, and this road is connected to another road
               * without defining whether that other road is connected to the currentNode,
               * then it is assumed that the other road is also connected to the currentNode
               */
              connectionByOthers.set(connectionNeighbour.road_id, {
                road_id: connectionNeighbour.road_id,
                distance_value: 0,
              });
            }
          }
        }

        // Finally, the connections that connected to this currentNode, then being merged to this currentNode connections
        currentNodeConnections = currentNodeConnections.concat([
          ...connectionByOthers.values(),
        ]);

        for (const { road_id, distance_value } of currentNodeConnections) {
          if (!notBeenPassed.has(road_id)) continue;

          // Calculate the total congestion value for the current road
          const congestionValueTotal = currentNodeData?.vehicles.reduce(
            (total, { vehicle_id, amount }) => {
              const vehicleData = vehicleLookup[vehicle_id];
              return total + vehicleData.congestion_value * amount;
            },
            0,
          );

          // Calculate the total traffic value: distance + congestion
          const trafficValue =
            trafficValues[currentRoadId] +
            distance_value +
            congestionValueTotal;

          // Update the shortest path if the calculated traffic value is smaller
          if (
            trafficValues[road_id] === undefined ||
            trafficValue < trafficValues[road_id]
          ) {
            trafficValues[road_id] = trafficValue; // Update the traffic value for this road
            previous[road_id] = currentRoadId; // Set the current road as the predecessor
          }
        }
      }

      // Using the 'previous' list, we can backtrack from the end node to reconstruct the full path.
      const direction: string[] = [];
      let roadName: string | null = endRoadData.name;
      while (roadName) {
        direction.unshift(roadName);
        const roadData = roads.find((road) => road.name === roadName)!;
        const previousRoadId = previous[roadData.id];
        if (previousRoadId) {
          const previousRoadData = roads.find(
            (road) => road.id === previousRoadId,
          )!;
          roadName = previousRoadData.name;
        } else {
          roadName = null;
        }
      }

      return direction[0] === startRoadData.name ? direction : [];
    } catch (e) {
      throw e;
    }
  }
}
