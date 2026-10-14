import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ticket } from '../../model/ticket';
import { TicketService } from '../../services/ticket';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-ticket-list',
  styleUrl: './ticket-list.css',
  templateUrl: './ticket-list.html',
})
export class TicketList {
  tickets: Ticket[] = [];

  constructor(private TicketService: TicketService) {}
  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.tickets = this.TicketService.getTickets();
  }

  deleteTicket(id: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.TicketService.deleteTicket(id);
      this.loadTickets();
    }
  }
}
