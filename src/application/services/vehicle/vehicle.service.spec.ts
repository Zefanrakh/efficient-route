import { UpdateCongestionPayloadDto } from 'src/infrastructure/modules/vehicle/dtos/update-congestion.dto';
import { vehicleService } from './vehicle.service';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { IndexVehicleUseCase } from 'src/application/use-cases/vehicle/index-vehicle.use-case';
import { UpdateCongestionUseCase } from 'src/application/use-cases/vehicle/update-congestion.use-case';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { IndexCongestionUseCase } from 'src/application/use-cases/vehicle/index-congestion.use-case';
import { mockRoads } from '../../../application/utils/mock/mockRoads';

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

    roadRepository.findAll.mockResolvedValue(mockRoads);
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
