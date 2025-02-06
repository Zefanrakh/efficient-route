import { UpdateCongestionPayloadDto } from 'src/infrastructure/modules/vehicle/dtos/update-congestion.dto';
import { vehicleService } from './vehicle.service';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { IndexVehicleUseCase } from 'src/application/use-cases/vehicle/index-vehicle.use-case';
import { UpdateCongestionUseCase } from 'src/application/use-cases/vehicle/update-congestion.use-case';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { IndexCongestionUseCase } from 'src/application/use-cases/vehicle/index-congestion.use-case';

const mockVehicles = [
  {
    id: 1,
    name: 'Bike',
    congestion_value: 1,
  },
  {
    id: 2,
    name: 'Car',
    congestion_value: 2,
  },
  {
    id: 3,
    name: 'Bus',
    congestion_value: 4,
  },
];

describe('VehicleService', () => {
  let service: vehicleService;
  let vehicleRepository: jest.Mocked<VehicleRepository>;
  let roadRepository: jest.Mocked<RoadRepository>;
  let indexVehicleUseCase: jest.Mocked<IndexVehicleUseCase>;
  let indexCongestionUseCase: jest.Mocked<IndexCongestionUseCase>;
  let updateCongestionUseCase: jest.Mocked<UpdateCongestionUseCase>;

  beforeEach(() => {
    vehicleRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<VehicleRepository>;
    roadRepository = {
      findAll: jest.fn(),
      updateAll: jest.fn(),
    } as unknown as jest.Mocked<RoadRepository>;
    indexVehicleUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IndexVehicleUseCase>;
    indexCongestionUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IndexCongestionUseCase>;
    updateCongestionUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateCongestionUseCase>;

    service = new vehicleService(
      indexVehicleUseCase,
      indexCongestionUseCase,
      updateCongestionUseCase,
      vehicleRepository,
      roadRepository,
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
  });
  it('should list all vehicles', async () => {
    vehicleRepository.findAll.mockResolvedValue(mockVehicles);
    const spy = jest
      .spyOn(service['indexVehicleUseCase'], 'execute')
      .mockResolvedValue(mockVehicles);
    const result = await service.listVehicles();
    expect(result).toEqual(mockVehicles);
    expect(spy).toHaveBeenCalled();
  });

  it('should update congestion successfully', async () => {
    const mockPayload: UpdateCongestionPayloadDto = {
      congestions: [
        {
          road_id: 9,
          vehicles: [
            { vehicle_id: 1, amount: 3 },
            { vehicle_id: 2, amount: 5 },
          ],
        },
      ],
    };

    const spy = jest.spyOn(service['updateCongestionUseCase'], 'execute');
    await service.updateCongestion(mockPayload);

    expect(spy).toHaveBeenCalledWith(mockPayload);
  });
});
