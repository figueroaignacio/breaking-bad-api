// Decorators
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateDeathDto {
  @ApiProperty({ example: 6, description: 'ID of the victim character' })
  @IsInt()
  victimId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the killer character' })
  @IsOptional()
  @IsInt()
  killerId?: number;

  @ApiPropertyOptional({ example: 'Pipe bomb explosion' })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID of the episode' })
  @IsOptional()
  @IsInt()
  episodeId?: number;

  @ApiPropertyOptional({ example: 'Walter uses a pipe bomb...' })
  @IsOptional()
  @IsString()
  circumstances?: string;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  brutalityLevel?: number;
}
