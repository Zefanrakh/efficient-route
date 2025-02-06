import { Road } from 'src/domain/entities/road.entity';
import { RoadRepository } from 'src/domain/repositories/road.repository';

export class FindRoadByIdUseCase {
  constructor(private readonly roadRepository: RoadRepository) {}

  /**
   * Executes the use case to find a road by its ID.
   * @param {number} id - The ID of the road to find.
   * @returns {Promise<Road | null>} - A promise that resolves to the road object if found, otherwise null.
   */
  async execute(id: number): Promise<Road> {
    return await this.roadRepository.findById(id);
  }
}
