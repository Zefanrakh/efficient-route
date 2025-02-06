import { Vehicle } from '../entities/vehicle.entity';

export abstract class VehicleRepository {
  abstract findAll(): Promise<Vehicle[]>;
}
