import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsArrayOfObjects } from 'src/application/utils/decorator/isArrayOfObjects';

export class ReadCongestionVehicleDto {
  @IsNumber()
  vehicle_id: number;

  @IsNumber()
  amount: number;
}

export class ReadCongestionDto {
  @IsNumber()
  road_id: number;

  @Type(() => ReadCongestionVehicleDto)
  vehicles: ReadCongestionVehicleDto[];
}
