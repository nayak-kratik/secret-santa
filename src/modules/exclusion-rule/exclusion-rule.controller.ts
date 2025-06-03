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

@Controller('exclusion-rules')
export class ExclusionRuleController {
  constructor(private readonly exclusionRuleService: ExclusionRuleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() createExclusionRuleDTO: CreateExclusionRuleDTO[]) {
    return this.exclusionRuleService.createMany(createExclusionRuleDTO);
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
