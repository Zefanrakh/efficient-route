import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { vehicleService } from 'src/application/services/vehicle/vehicle.service';
import { IndexVehicleUseCase } from 'src/application/use-cases/vehicle/index-vehicle.use-case';
import { UpdateCongestionUseCase } from 'src/application/use-cases/vehicle/update-congestion.use-case';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { VehicleRepositoryImpl } from '../road/repositories/vehicle.repository.impl';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { RoadRepositoryImpl } from '../road/repositories/road.repository.impl';
import { RoadModule } from '../road/road.module';
import { IndexCongestionUseCase } from 'src/application/use-cases/vehicle/index-congestion.use-case';

@Module({
  controllers: [VehicleController],
  providers: [
    vehicleService,
    {
      provide: VehicleRepository,
      useClass: VehicleRepositoryImpl,
    },
    IndexVehicleUseCase,
    IndexCongestionUseCase,
    UpdateCongestionUseCase,
  ],
  imports: [RoadModule],
  exports: [vehicleService],
})
export class VehicleModule {}
