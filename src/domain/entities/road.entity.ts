import { Connection } from './connection.entity';
import { VehicleAmount } from './vehicle-amount.entity';

export class Road {
  id: number;
  name: string;
  connections: Connection[];
  vehicles: VehicleAmount[];
}
