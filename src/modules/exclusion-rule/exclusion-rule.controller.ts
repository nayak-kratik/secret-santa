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

@Controller('exclusion-rules')
export class ExclusionRuleController {
  constructor(
    private readonly exclusionRuleService: ExclusionRuleService,
    private readonly matchService: MatchService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() createExclusionRuleDTO: CreateExclusionRuleDTO[]) {
    // Create exclusions and get the exchangeId from the first DTO (assuming all are for the same exchange)
    const exclusions = await this.exclusionRuleService.createMany(createExclusionRuleDTO);
    const exchangeId = createExclusionRuleDTO[0].gift_exchange_id;

    // Call match logic and save matches
    const matches = await this.matchService.generateAndSaveMatches(exchangeId);
    // Return both exclusions and matches if needed
    return { exclusions, matches };
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
