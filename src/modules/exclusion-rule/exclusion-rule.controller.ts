import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ExclusionRuleService } from './exclusion-rule.service';
import { CreateExclusionRuleDTO } from './dto/create-exclusion-rule.dto';
import { MatchService } from '../matches/match.service';
import { ExclusionRule } from './exclusion-rule.entity';

@Controller('exclusion-rules')
export class ExclusionRuleController {
  constructor(
    private readonly exclusionRuleService: ExclusionRuleService,
    private readonly matchService: MatchService,
  ) {}

  @Post('exchange/:exchangeId')
  @HttpCode(HttpStatus.CREATED)
  async createMany(
    @Param('exchangeId', ParseIntPipe) exchangeId: number,
    @Body() createExclusionRuleDTO: CreateExclusionRuleDTO[],
  ) {
    let exclusions: ExclusionRule[] = [];
    if (Array.isArray(createExclusionRuleDTO) && createExclusionRuleDTO.length > 0) {
      exclusions = await this.exclusionRuleService.createMany(createExclusionRuleDTO);
    }
    const matches = await this.matchService.generateAndSaveMatches(exchangeId);
    return { matches };
  }

  @Get('exchange/:exchangeId')
  async findAllByExchangeId(@Param('exchangeId', ParseIntPipe) exchangeId: number) {
    return this.exclusionRuleService.findAllByExchangeId(exchangeId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exclusionRuleService.remove(id);
  }
}
