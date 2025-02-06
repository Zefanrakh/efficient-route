import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsArrayOfObjects } from 'src/application/utils/decorator/isArrayOfObjects';

export class UpdateCongestionVehicleDto {
  @IsNumber({}, { message: 'vehicle_id must be a number' })
  vehicle_id: number;

  @IsNumber({}, { message: 'amount must be a number' })
  amount: number;
}

export class UpdateCongestionDto {
  @IsNumber({}, { message: 'road_id must be a number' })
  road_id: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateCongestionVehicleDto)
  @IsArrayOfObjects({ message: 'vehicles must be an array of valid objects' })
  vehicles: UpdateCongestionVehicleDto[];
}

export class UpdateCongestionPayloadDto {
  @ValidateNested()
  @Type(() => UpdateCongestionDto)
  congestions: UpdateCongestionDto[];
}
