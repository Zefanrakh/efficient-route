import { Vehicle } from 'src/domain/entities/vehicle.entity';
import { VehicleRepository } from 'src/domain/repositories/vehicle.repository';

export class IndexVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  /**
   * Executes the use case to fetch all vehicles.
   * @returns {Promise<Vehicle[]>}
   */
  async execute(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }
}
