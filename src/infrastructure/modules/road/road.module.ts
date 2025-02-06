import { Module } from '@nestjs/common';
import { RoadController } from './road.controller';
import { RoadRepository } from 'src/domain/repositories/road.repository';
import { RoadRepositoryImpl } from './repositories/road.repository.impl';
import { roadService } from 'src/application/services/road/road.service';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';
import { VehicleRepositoryImpl } from './repositories/vehicle.repository.impl';
import { IndexRoadUseCase } from 'src/application/use-cases/road/index-road.use-case';
import { FindRoadByIdUseCase } from 'src/application/use-cases/road/find-road-by-id.use-case';
import { GetEfficientRouteUseCase } from 'src/application/use-cases/road/get-efficient-route.use-case';
import { UpdateCongestionUseCase } from 'src/application/use-cases/vehicle/update-congestion.use-case';
import { VehicleModule } from '../vehicle/vehicle.module';
import { vehicleService } from 'src/application/services/vehicle/vehicle.service';

@Module({
  controllers: [RoadController],
  providers: [
    roadService,
    {
      provide: RoadRepository,
      useClass: RoadRepositoryImpl,
    },
    {
      provide: VehicleRepository,
      useClass: VehicleRepositoryImpl,
    },
    IndexRoadUseCase,
    FindRoadByIdUseCase,
    GetEfficientRouteUseCase,
  ],
  exports: [roadService, RoadRepository],
})
export class RoadModule {}
