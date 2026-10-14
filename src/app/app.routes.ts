import { Routes } from '@angular/router';
import { TicketList } from './component/ticket-list/ticket-list';
import { TicketForm } from './component/ticket-form/ticket-form';

export const routes: Routes = [
  { path: '', component: TicketList },
  { path: 'create', component: TicketForm },
  { path: 'edit/:id', component: TicketForm },
  { path: 'details/:id', component: TicketForm }, //TicketDetails
  { path: '**', redirectTo: '' },
];
