import { roadService } from './road.service';
import { IndexRoadUseCase } from '../../use-cases/road/index-road.use-case';
import { FindRoadByIdUseCase } from '../../use-cases/road/find-road-by-id.use-case';
import { GetEfficientRouteUseCase } from '../../use-cases/road/get-efficient-route.use-case';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { UpdateCongestionUseCase } from '../../use-cases/vehicle/update-congestion.use-case';
import { UpdateCongestionPayloadDto } from 'src/infrastructure/modules/vehicle/dtos/update-congestion.dto';

const mockRoads = [
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
];

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
  let updateCongestionUseCase: jest.Mocked<UpdateCongestionUseCase>;

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
