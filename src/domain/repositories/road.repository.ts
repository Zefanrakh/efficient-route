import { Road } from '../entities/road.entity';

export abstract class RoadRepository {
  abstract findById(id: number): Promise<Road | null>;
  abstract findAll(): Promise<Road[]>;
  abstract updateAll(newRoad: Road[]): Promise<void>;
}
