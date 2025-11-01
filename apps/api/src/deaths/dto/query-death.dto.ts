// Decorators
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryDeathDto {
  @ApiPropertyOptional({ example: 1, description: 'Filter by victim ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  victimId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by killer ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  killerId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by season' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  season?: number;

  @ApiPropertyOptional({ example: 10, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
