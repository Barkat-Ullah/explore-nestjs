import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { Tickets } from './tickets.interface.js';
import { CreateTicketDto } from './dto/create-ticket-dto.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(
    @Query('status') status?: Tickets['status'],
    @Query('priority') priority?: Tickets['priority'],
  ) {
    return this.ticketsService.findAll(status, priority);
  }
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findById(id);
  }
  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }
}
