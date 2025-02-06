import { RoadRepository } from 'src/domain/repositories/road.repository';
import { GetEfficientRouteUseCase } from './get-efficient-route.use-case';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { mockRoads } from '../../../application/utils/mock/mockRoads';

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

    roadRepository.findAll.mockResolvedValue(mockRoads);

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
    const mockRoadsWithVehicle = [...mockRoads];
    const target = mockRoadsWithVehicle.find((mockRoad) => mockRoad.id === 9);
    (target.vehicles = [
      {
        amount: 1,
        vehicle_id: 1,
      },
    ]),
      roadRepository.findAll.mockResolvedValueOnce(mockRoadsWithVehicle);

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
