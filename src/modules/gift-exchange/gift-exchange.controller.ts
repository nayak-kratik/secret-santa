import { Body, Controller, Post } from '@nestjs/common';
import { CreateGiftExchangeDTO } from './dto/create-gift-exchange.dto';
import { GiftExchangeService } from './gift-exchange.service';

@Controller('gift-exchange')
export class GiftExchangeController {
  constructor(private readonly giftExchangeService: GiftExchangeService) {}

  @Post()
  async create(@Body() createGiftExchangeDTO: CreateGiftExchangeDTO): Promise<{
    statusCode: number;
    message: string;
  }> {
    await this.giftExchangeService.create(createGiftExchangeDTO);
    return { statusCode: 123, message: '123' };
  }
}
