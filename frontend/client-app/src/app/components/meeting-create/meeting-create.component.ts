import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { MeetingService } from '../../services/meeting.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-meeting-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,          // ✅ FIX 1: NgIf added
    CommonModule   // ✅ FIX 2: CommonModule added
  ],
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.css']
})
export class MeetingCreateComponent implements OnInit {

  meetingForm!: FormGroup;
  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private meetingService: MeetingService,
    private router: Router
  ) {}

  

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      client_id: ['', Validators.required],
      topic: ['', Validators.required],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required],
      location: [''],
      notes: ['']
    });

    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res;
    });
  }

  isInvalid(field: string) {
    return this.meetingForm.get(field)?.invalid && this.meetingForm.get(field)?.touched;
  }

  onSubmit() {
    if (this.meetingForm.invalid) return;

    this.meetingService.addMeeting(this.meetingForm.value).subscribe(() => {
      alert("Meeting scheduled!");
    });
  }

 goBackToLogin() {
  localStorage.removeItem('isLoggedIn'); // user ko logout bhi kar de
  this.router.navigate(['/login']);
}

}
