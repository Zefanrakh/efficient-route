import { Road } from 'src/domain/entities/road.entity';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { UpdateCongestionPayloadDto } from 'src/infrastructure/modules/vehicle/dtos/update-congestion.dto';

export class UpdateCongestionUseCase {
  constructor(private readonly roadRepository: RoadRepository) {}

  /**
   * Updates congestion levels for specified roads.
   * @param {UpdateCongestionPayloadDto} payload - DTO containing congestion updates for roads.
   * @returns {Promise<Road[]>} - A promise that resolves to the updated list of roads.
   * @throws {Error} - Throws an error if a road ID is not found.
   */
  async execute(payload: UpdateCongestionPayloadDto): Promise<Road[]> {
    try {
      const roads = await this.roadRepository.findAll();
      const payloadCongestionLookup = Object.fromEntries(
        payload.congestions.map((c) => [c.road_id, c.vehicles]),
      );
      roads.forEach((road) => {
        const vehicles = payloadCongestionLookup[road.id];
        if (vehicles) {
          road.vehicles = vehicles;
        } else {
          road.vehicles = [];
        }
      });
      payload.congestions.forEach((congestion) => {
        const { road_id, vehicles } = congestion;
        const road = roads.find((r) => r.id === road_id);
        road.vehicles = vehicles;
      });

      await this.roadRepository.updateAll(roads);

      return roads;
    } catch (e) {
      throw e;
    }
  }
}
