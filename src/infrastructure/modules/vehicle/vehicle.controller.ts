import { Body, Controller, Get, Post } from '@nestjs/common';
import { Road } from 'src/domain/entities/road.entity';
import { UpdateCongestionPayloadDto } from './dtos/update-congestion.dto';
import { handleError } from 'src/application/errorHandling/errorHandling';
import { vehicleService } from 'src/application/services/vehicle/vehicle.service';
import { Vehicle } from 'src/domain/entities/vehicle.entity';
import { ReadCongestionDto } from './dtos/list-congestion.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: vehicleService) {}

  /**
   * Retrieves all available vehicles.
   * @returns {Promise<Vehicle[]>} - A promise that resolves to an array of all vehicles.
   */
  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.listVehicles();
  }

  /**
   * Controller method to retrieve all congestion data.
   * @returns {Promise<ReadCongestionVehicleDto[]>} A promise resolving to an array of congestion vehicle data.
   */
  @Get('/congestion')
  async findAllCongestions(): Promise<ReadCongestionDto[]> {
    return this.vehicleService.listCongestions();
  }

  /**
   * Updates congestion data on roads based on vehicle activity.
   * @param {UpdateCongestionPayloadDto} payload - DTO containing congestion updates for roads.
   * @returns {Promise<Road[]>} - A promise that resolves to an array of updated roads.
   * @throws {Error} - Throws an error if congestion update fails.
   */
  @Post('/congestion')
  async updateCongestion(
    @Body() payload: UpdateCongestionPayloadDto,
  ): Promise<Road[]> {
    try {
      return this.vehicleService.updateCongestion(payload);
    } catch (e) {
      handleError(e);
    }
  }
}
