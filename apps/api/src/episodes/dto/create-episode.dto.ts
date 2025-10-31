// Decorators
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty({ example: 'Pilot' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  season: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  episode: number;

  @ApiPropertyOptional({ example: '2008-01-20' })
  @IsOptional()
  @IsString()
  airDate?: string;

  @ApiPropertyOptional({ example: 'Vince Gilligan' })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({ example: 'Vince Gilligan' })
  @IsOptional()
  @IsString()
  writer?: string;

  @ApiPropertyOptional({ example: 'A high school chemistry teacher...' })
  @IsOptional()
  @IsString()
  synopsis?: string;

  @ApiPropertyOptional({ example: '9.0' })
  @IsOptional()
  @IsString()
  imdbRating?: string;

  @ApiPropertyOptional({ example: '58 min' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({ example: 'https://example.com/poster.jpg' })
  @IsOptional()
  @IsString()
  poster?: string;
}
