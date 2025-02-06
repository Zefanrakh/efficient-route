import { RoadRepository } from 'src/domain/repositories/road.repository';
import { GetEfficientRouteUseCase } from './get-efficient-route.use-case';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';

describe('GetEfficientRouteUseCase', () => {
  let getEfficientRouteUseCase: GetEfficientRouteUseCase;
  let roadRepository: jest.Mocked<RoadRepository>;
  let vehicleRepository: jest.Mocked<VehicleRepository>;

  beforeEach(() => {
    roadRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<RoadRepository>;

    vehicleRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<VehicleRepository>;

    getEfficientRouteUseCase = new GetEfficientRouteUseCase(
      roadRepository,
      vehicleRepository,
    );

    roadRepository.findAll.mockResolvedValue([
      {
        id: 1,
        name: 'NE 42nd Way',
        connections: [
          {
            road_id: 2,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 2,
        name: 'NE 42nd St',
        connections: [
          {
            road_id: 3,
            distance_value: 1,
          },
          {
            road_id: 5,
            distance_value: 1,
          },
          {
            road_id: 6,
            distance_value: 1,
          },
          {
            road_id: 8,
            distance_value: 1,
          },
          {
            road_id: 9,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 3,
        name: '201st Ave NE',
        connections: [
          {
            road_id: 4,
            distance_value: 1,
          },
          {
            road_id: 5,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 4,
        name: 'NE 44th St',
        connections: [
          {
            road_id: 5,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 5,
        name: '202nd Ave NE',
        connections: [],
        vehicles: [],
      },
      {
        id: 6,
        name: 'NE 39th St West',
        connections: [
          {
            road_id: 7,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 7,
        name: 'NE 39th Ln',
        connections: [],
        vehicles: [],
      },
      {
        id: 8,
        name: '203rd Ave NE',
        connections: [
          {
            road_id: 9,
            distance_value: 1,
          },
          {
            road_id: 10,
            distance_value: 2,
          },
        ],
        vehicles: [],
      },
      {
        id: 9,
        name: 'NE 39th St East',
        connections: [
          {
            road_id: 10,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 10,
        name: '204th Ave NE',
        connections: [
          {
            road_id: 11,
            distance_value: 1,
          },
          {
            road_id: 12,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 11,
        name: '206th PI NE',
        connections: [],
        vehicles: [],
      },
      {
        id: 12,
        name: '205th PI NE',
        connections: [],
        vehicles: [],
      },
    ]);

    vehicleRepository.findAll.mockResolvedValue([
      { id: 1, name: 'Bike', congestion_value: 1 },
      { id: 2, name: 'Car', congestion_value: 2 },
      { id: 3, name: 'Bus', congestion_value: 4 },
    ]);
  });

  it('should return the most efficient route', async () => {
    const result = await getEfficientRouteUseCase.execute({
      start: 1,
      end: 11,
    });

    expect(result).toEqual([
      'NE 42nd Way',
      'NE 42nd St',
      'NE 39th St East',
      '204th Ave NE',
      '206th PI NE',
    ]);
    expect(roadRepository.findAll).toHaveBeenCalled();
    expect(vehicleRepository.findAll).toHaveBeenCalled();
  });

  it('should return empty route if start or end is not found', async () => {
    const result = await getEfficientRouteUseCase.execute({
      start: 110,
      end: 111,
    });

    expect(result).toEqual([]);
  });

  it('should calculate route when one road has vehicles', async () => {
    roadRepository.findAll.mockResolvedValueOnce([
      {
        id: 1,
        name: 'NE 42nd Way',
        connections: [
          {
            road_id: 2,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 2,
        name: 'NE 42nd St',
        connections: [
          {
            road_id: 3,
            distance_value: 1,
          },
          {
            road_id: 5,
            distance_value: 1,
          },
          {
            road_id: 6,
            distance_value: 1,
          },
          {
            road_id: 8,
            distance_value: 1,
          },
          {
            road_id: 9,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 3,
        name: '201st Ave NE',
        connections: [
          {
            road_id: 4,
            distance_value: 1,
          },
          {
            road_id: 5,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 4,
        name: 'NE 44th St',
        connections: [
          {
            road_id: 5,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 5,
        name: '202nd Ave NE',
        connections: [],
        vehicles: [],
      },
      {
        id: 6,
        name: 'NE 39th St West',
        connections: [
          {
            road_id: 7,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 7,
        name: 'NE 39th Ln',
        connections: [],
        vehicles: [],
      },
      {
        id: 8,
        name: '203rd Ave NE',
        connections: [
          {
            road_id: 9,
            distance_value: 1,
          },
          {
            road_id: 10,
            distance_value: 2,
          },
        ],
        vehicles: [],
      },
      {
        id: 9,
        name: 'NE 39th St East',
        connections: [
          {
            road_id: 10,
            distance_value: 1,
          },
        ],
        // This road has vehicles
        vehicles: [
          {
            amount: 1,
            vehicle_id: 1,
          },
        ],
      },
      {
        id: 10,
        name: '204th Ave NE',
        connections: [
          {
            road_id: 11,
            distance_value: 1,
          },
          {
            road_id: 12,
            distance_value: 1,
          },
        ],
        vehicles: [],
      },
      {
        id: 11,
        name: '206th PI NE',
        connections: [],
        vehicles: [],
      },
      {
        id: 12,
        name: '205th PI NE',
        connections: [],
        vehicles: [],
      },
    ]);

    const result = await getEfficientRouteUseCase.execute({
      start: 1,
      end: 11,
    });

    expect(result).toEqual([
      'NE 42nd Way',
      'NE 42nd St',
      '203rd Ave NE',
      '204th Ave NE',
      '206th PI NE',
    ]);
    expect(roadRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should handle no valid route scenario', async () => {
    roadRepository.findAll.mockResolvedValue([
      {
        id: 1,
        name: 'Start',
        connections: [],
        vehicles: [],
      },
      {
        id: 2,
        name: 'End',
        connections: [],
        vehicles: [],
      },
    ]);
    vehicleRepository.findAll.mockResolvedValue([]);

    const result = await getEfficientRouteUseCase.execute({
      start: 111,
      end: 113,
    });
    expect(result).toEqual([]);
  });
});
