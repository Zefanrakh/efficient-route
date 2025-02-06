import { Injectable } from '@nestjs/common';
import { UpdateCongestionUseCase } from '../../use-cases/vehicle/update-congestion.use-case';
import { IndexVehicleUseCase } from '../../use-cases/vehicle/index-vehicle.use-case';
import { IndexCongestionUseCase } from '../../use-cases/vehicle/index-congestion.use-case';
import { VehicleRepository } from '../../../domain/repositories/vehicle.repository';
import { UpdateCongestionPayloadDto } from 'src/infrastructure/modules/vehicle/dtos/update-congestion.dto';
import { RoadRepository } from '../../../domain/repositories/road.repository';

@Injectable()
export class vehicleService {
  constructor(
    private readonly indexVehicleUseCase: IndexVehicleUseCase,
    private readonly indexCongestionUseCase: IndexCongestionUseCase,
    private readonly updateCongestionUseCase: UpdateCongestionUseCase,
    private readonly vehicleRepository: VehicleRepository,
    private readonly roadRepository: RoadRepository,
  ) {
    this.indexVehicleUseCase = new IndexVehicleUseCase(this.vehicleRepository);
    this.indexCongestionUseCase = new IndexCongestionUseCase(
      this.roadRepository,
    );
    this.updateCongestionUseCase = new UpdateCongestionUseCase(
      this.roadRepository,
    );
  }

  public async listVehicles() {
    return await this.indexVehicleUseCase.execute();
  }

  public async listCongestions() {
    return await this.indexCongestionUseCase.execute();
  }

  public async updateCongestion(payload: UpdateCongestionPayloadDto) {
    return await this.updateCongestionUseCase.execute(payload);
  }
}
