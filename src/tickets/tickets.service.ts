import { Injectable, NotFoundException } from '@nestjs/common';
import { Tickets } from './tickets.interface.js';
import { CreateTicketDto } from './dto/create-ticket-dto.js';

@Injectable()
export class TicketsService {
  private readonly tickets: Tickets[] = [
    {
      id: 1,
      subject: 'Cannot login to account',
      description: 'User cannot access the dashboard after login.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-09-01T10:00:00.000Z',
    },
    {
      id: 2,
      subject: 'Payment failed',
      description: 'Card payment fails at the checkout step.',
      priority: 'medium',
      status: 'open',
      createdAt: '2026-09-01T11:30:00.000Z',
    },
    {
      id: 3,
      subject: 'Invoice download not working',
      description: 'Invoice PDF download returns an empty file.',
      priority: 'low',
      status: 'closed',
      createdAt: '2026-09-01T12:45:00.000Z',
    },
  ];

  private nextId = 4;

  findAll(status?:Tickets['status'], priority?:Tickets['priority']) {
    let filteredTickets = this.tickets;
    if (status) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === status);
    }
    if (priority) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.priority === priority);
    }
    return filteredTickets;
  }
  findById(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }
  createTicket(createTicketDto:CreateTicketDto) {
    const newTicket: Tickets = {
      id: this.nextId++,
      subject: createTicketDto.subject,
      description: createTicketDto.description,
      priority: createTicketDto.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(newTicket);
    return newTicket;
  }
}
