import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ExclusionRuleService } from './exclusion-rule.service';
import { CreateExclusionRuleDTO } from './dto/create-exclusion-rule.dto';

@Controller('exclusion-rules')
export class ExclusionRuleController {
  constructor(private readonly exclusionRuleService: ExclusionRuleService) {}

  @Post()
  create(@Body() createExclusionRuleDTO: CreateExclusionRuleDTO) {
    return this.exclusionRuleService.create(createExclusionRuleDTO);
  }

  @Get()
  findAll() {
    return this.exclusionRuleService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exclusionRuleService.remove(id);
  }
}
