import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGiftExchangeDTO } from './dto/create-gift-exchange.dto';
import { GiftExchangeService } from './gift-exchange.service';
import { GiftExchange } from './gift-exchange.entity';
import { UpdateGiftExchangeDto } from './dto/update-gift-exchange.dto';

@Controller('gift-exchanges')
export class GiftExchangeController {
  constructor(private readonly giftExchangeService: GiftExchangeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGiftExchangeDTO: CreateGiftExchangeDTO): Promise<GiftExchange> {
    return await this.giftExchangeService.create(createGiftExchangeDTO);
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<GiftExchange[]> {
    return this.giftExchangeService.findAllByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GiftExchange> {
    return this.giftExchangeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGiftExchangeDto: UpdateGiftExchangeDto,
  ): Promise<GiftExchange> {
    return this.giftExchangeService.update(id, updateGiftExchangeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.giftExchangeService.remove(id);
  }
}
