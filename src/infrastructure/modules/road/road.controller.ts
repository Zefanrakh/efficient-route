import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { roadService } from 'src/application/services/road/road.service';
import { Road } from 'src/domain/entities/road.entity';
import { GetRouteDto } from './dtos/get-route.dto';
import { handleError } from 'src/application/errorHandling/errorHandling';

@Controller('road')
export class RoadController {
  constructor(private readonly roadService: roadService) {}

  /**
   * Retrieves all roads.
   * @returns {Promise<Road[]>} - A promise that resolves to an array of all roads.
   */
  @Get()
  async findAll(): Promise<Road[]> {
    return this.roadService.listRoads();
  }

  /**
   * Finds the most efficient route between two roads.
   * @param {GetRouteDto} query - Query parameters containing the start and end road names.
   * @returns {Promise<string[]>} - A promise that resolves to an array representing the route name.
   * @throws {Error} - Throws an error if route calculation fails.
   */
  @Get('/route')
  async getEfficientRoute(
    @Query()
    query: GetRouteDto,
  ): Promise<string[]> {
    try {
      return this.roadService.getEfficientRoute(query);
    } catch (e) {
      handleError(e);
    }
  }

  /**
   * Finds a specific road by its ID.
   * @param {number} id - The ID of the road.
   * @returns {Promise<Road>} - A promise that resolves to the road object.
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Road> {
    return this.roadService.findRoadById(id);
  }
}
