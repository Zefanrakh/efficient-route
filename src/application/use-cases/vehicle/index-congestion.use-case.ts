import { RoadRepository } from 'src/domain/repositories/road.repository';
import { ReadCongestionDto } from 'src/infrastructure/modules/vehicle/dtos/list-congestion.dto';

export class IndexCongestionUseCase {
  constructor(private readonly roadRepository: RoadRepository) {}

  /**
   * Executes the use case to fetch all congestions.
   * @returns {Promise<ReadCongestionDto[]>}
   */
  async execute(): Promise<ReadCongestionDto[]> {
    const roads = await this.roadRepository.findAll();

    const congestions: ReadCongestionDto[] = [];
    roads.forEach((road) => {
      if (road.vehicles.length) {
        congestions.push({
          road_id: road.id,
          vehicles: road.vehicles,
        });
      }
    });
    return congestions;
  }
}
