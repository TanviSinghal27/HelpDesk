export interface Ticket {
  ticketId: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdDate: string;
}
