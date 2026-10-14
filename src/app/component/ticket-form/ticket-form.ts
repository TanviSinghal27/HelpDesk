import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-ticket-form',
  styleUrl: './ticket-form.css',
  templateUrl: './ticket-form.html',
})
export class TicketForm implements OnInit {
  ticketForm!: FormGroup;
  isEditMode = false;
  isViewOnly = false;
  ticketId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.subscribe((params) => {
      this.isViewOnly = params['view'] === 'true';
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.ticketId = +params['id'];
        this.isEditMode = !this.isViewOnly;
        this.loadTicketData(this.ticketId);
      }
    });
  }

  initForm(): void {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Open', Validators.required],
    });
  }

  loadTicketData(id: number): void {
    const ticket = this.ticketService.getTicketById(id);
    if (ticket) {
      this.ticketForm.patchValue({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
      });

      if (this.isViewOnly) {
        this.ticketForm.disable();
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) return;
    const payload = {
      ...this.ticketForm.value,
      ...(this.ticketId && { ticketId: this.ticketId }),
    };

    this.ticketService.saveTicket(payload);
    this.router.navigate(['/']);
  }
}
