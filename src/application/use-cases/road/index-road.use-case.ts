import { Road } from 'src/domain/entities/road.entity';
import { RoadRepository } from 'src/domain/repositories/road.repository';

export class IndexRoadUseCase {
  constructor(private readonly roadRepository: RoadRepository) {}

  /**
   * Executes the use case to fetch all roads.
   * @returns {Promise<Road[]>}
   */
  async execute(): Promise<Road[]> {
    return await this.roadRepository.findAll();
  }
}
