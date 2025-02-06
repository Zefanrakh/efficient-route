import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoadModule } from './infrastructure/modules/road/road.module';
import { VehicleModule } from './infrastructure/modules/vehicle/vehicle.module';

@Module({
  imports: [RoadModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
