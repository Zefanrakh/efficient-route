import { Injectable } from '@nestjs/common';
import { Vehicle } from 'src/domain/entities/vehicle.entity';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';

@Injectable()
export class VehicleRepositoryImpl implements VehicleRepository {
  private vehicles: Vehicle[] = [
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

  async findAll(): Promise<Vehicle[]> {
    return this.vehicles;
  }
}
