import { Injectable, Service } from '@angular/core';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private storageKey = 'helpdesk_tickets';
  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultTickets: Ticket[] = [
        {
          ticketId: 1,
          title: 'Cannot Login',
          description: 'User cannot login to the portal',
          status: 'Open',
          createdDate: '2025-02-11',
        },
        {
          ticketId: 2,
          title: 'Email Not Working',
          description: 'Outlook throwing 500 error',
          status: 'Closed',
          createdDate: '2025-02-10',
        },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultTickets));
    }
  }

  getTickets(): Ticket[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getTicketById(id: number): Ticket | undefined {
    return this.getTickets().find((t) => t.ticketId === id);
  }

  saveTicket(ticket: Omit<Ticket, 'ticketId' | 'createdDate'> & { ticketId?: number }): void {
    const tickets = this.getTickets();
    if (ticket.ticketId) {
      const index = tickets.findIndex((t) => t.ticketId === ticket.ticketId);
      if (index !== -1) {
        tickets[index] = { ...tickets[index], ...ticket };
      }
    } else {
      const newId = tickets.length > 0 ? Math.max(...tickets.map((t) => t.ticketId)) + 1 : 1;
      const newTicket: Ticket = {
        ...ticket,
        ticketId: newId,
        createdDate: new Date().toISOString().split('T')[0],
      };
      tickets.push(newTicket);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(tickets));
  }

  deleteTicket(id: number): void {
    const tickets = this.getTickets().filter((t) => t.ticketId !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(tickets));
  }
}
