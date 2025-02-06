import { Injectable } from '@nestjs/common';
import { Road } from 'src/domain/entities/road.entity';
import { RoadRepository } from 'src/domain/repositories/road.repository';

@Injectable()
export class RoadRepositoryImpl implements RoadRepository {
  private roads: Road[] = [
    {
      id: 1,
      name: 'NE 42nd Way',
      connections: [
        {
          road_id: 2,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 2,
      name: 'NE 42nd St',
      connections: [
        {
          road_id: 3,
          distance_value: 1,
        },
        {
          road_id: 5,
          distance_value: 1,
        },
        {
          road_id: 6,
          distance_value: 1,
        },
        {
          road_id: 8,
          distance_value: 1,
        },
        {
          road_id: 9,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 3,
      name: '201st Ave NE',
      connections: [
        {
          road_id: 4,
          distance_value: 1,
        },
        {
          road_id: 5,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 4,
      name: 'NE 44th St',
      connections: [
        {
          road_id: 5,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 5,
      name: '202nd Ave NE',
      connections: [],
      vehicles: [],
    },
    {
      id: 6,
      name: 'NE 39th St West',
      connections: [
        {
          road_id: 7,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 7,
      name: 'NE 39th Ln',
      connections: [],
      vehicles: [],
    },
    {
      id: 8,
      name: '203rd Ave NE',
      connections: [
        {
          road_id: 9,
          distance_value: 1,
        },
        {
          road_id: 10,
          distance_value: 2,
        },
      ],
      vehicles: [],
    },
    {
      id: 9,
      name: 'NE 39th St East',
      connections: [
        {
          road_id: 10,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 10,
      name: '204th Ave NE',
      connections: [
        {
          road_id: 11,
          distance_value: 1,
        },
        {
          road_id: 12,
          distance_value: 1,
        },
      ],
      vehicles: [],
    },
    {
      id: 11,
      name: '206th PI NE',
      connections: [],
      vehicles: [],
    },
    {
      id: 12,
      name: '205th PI NE',
      connections: [],
      vehicles: [],
    },
  ];

  async findById(id: number): Promise<Road | null> {
    return await this.roads.find((road) => road.id === id);
  }

  async findAll(): Promise<Road[]> {
    return [...this.roads];
  }

  async updateAll(newRoads: Road[]): Promise<void> {
    this.roads = [...newRoads];
  }
}
