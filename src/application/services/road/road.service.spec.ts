import { roadService } from './road.service';
import { IndexRoadUseCase } from '../../use-cases/road/index-road.use-case';
import { FindRoadByIdUseCase } from '../../use-cases/road/find-road-by-id.use-case';
import { GetEfficientRouteUseCase } from '../../use-cases/road/get-efficient-route.use-case';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { mockRoads } from '../../../application/utils/mock/mockRoads';

const singleMockRoad = {
  id: 1,
  name: 'NE 42nd Way',
  connections: [
    {
      road_id: 2,
      distance_value: 1,
    },
  ],
  vehicles: [],
};

describe('RoadService', () => {
  let service: roadService;
  let roadRepository: jest.Mocked<RoadRepository>;
  let vehicleRepository: jest.Mocked<VehicleRepository>;
  let indexUseCase: jest.Mocked<IndexRoadUseCase>;
  let findRoadByIdUseCase: jest.Mocked<FindRoadByIdUseCase>;
  let getEfficientRouteUseCase: jest.Mocked<GetEfficientRouteUseCase>;

  beforeEach(() => {
    roadRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<RoadRepository>;
    vehicleRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<VehicleRepository>;
    indexUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IndexRoadUseCase>;
    findRoadByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindRoadByIdUseCase>;
    getEfficientRouteUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetEfficientRouteUseCase>;

    service = new roadService(
      indexUseCase,
      findRoadByIdUseCase,
      getEfficientRouteUseCase,
      roadRepository,
      vehicleRepository,
    );
  });
  it('should list all roads', async () => {
    roadRepository.findAll.mockResolvedValue(mockRoads);
    const spy = jest
      .spyOn(service['indexUseCase'], 'execute')
      .mockResolvedValue(mockRoads);
    const result = await service.listRoads();
    expect(result).toEqual(mockRoads);
    expect(spy).toHaveBeenCalled();
  });

  it('should find a road by ID', async () => {
    roadRepository.findById.mockResolvedValue(singleMockRoad);
    const spy = jest
      .spyOn(service['findRoadByIdUseCase'], 'execute')
      .mockResolvedValue(singleMockRoad);
    const result = await service.findRoadById(1);
    expect(result).toEqual(singleMockRoad);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should get the most efficient route', async () => {
    const spy = jest
      .spyOn(service['getEfficientRouteUseCase'], 'execute')
      .mockResolvedValue([
        'NE 42nd Way',
        'NE 42nd St',
        'NE 39th St East',
        '204th Ave NE',
        '206th PI NE',
      ]);

    const result = await service.getEfficientRoute({
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
    expect(spy).toHaveBeenCalledWith({
      start: 1,
      end: 11,
    });
  });
});
