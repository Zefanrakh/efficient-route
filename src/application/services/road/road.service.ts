import { Injectable } from '@nestjs/common';
import { IndexRoadUseCase } from '../../use-cases/road/index-road.use-case';
import { FindRoadByIdUseCase } from '../../use-cases/road/find-road-by-id.use-case';
import { GetEfficientRouteUseCase } from '../../use-cases/road/get-efficient-route.use-case';
import { GetRouteDto } from 'src/infrastructure/modules/road/dtos/get-route.dto';
import { RoadRepository } from '../../../domain/repositories/road.repository';
import { VehicleRepository } from '../../../domain/repositories/vehicle.repository';

@Injectable()
export class roadService {
  constructor(
    private readonly indexUseCase: IndexRoadUseCase,
    private readonly findRoadByIdUseCase: FindRoadByIdUseCase,
    private readonly getEfficientRouteUseCase: GetEfficientRouteUseCase,
    private readonly roadRepository: RoadRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {
    this.indexUseCase = new IndexRoadUseCase(this.roadRepository);
    this.findRoadByIdUseCase = new FindRoadByIdUseCase(this.roadRepository);
    this.getEfficientRouteUseCase = new GetEfficientRouteUseCase(
      this.roadRepository,
      this.vehicleRepository,
    );
  }

  public async listRoads() {
    return await this.indexUseCase.execute();
  }

  public async findRoadById(id: number) {
    return await this.findRoadByIdUseCase.execute(id);
  }

  public async getEfficientRoute(params: GetRouteDto) {
    return await this.getEfficientRouteUseCase.execute(params);
  }
}
