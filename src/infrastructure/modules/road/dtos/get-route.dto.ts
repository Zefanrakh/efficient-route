import { IsNumber, IsString } from 'class-validator';

export class GetRouteDto {
  @IsNumber()
  start: number;

  @IsNumber()
  end: number;
}
