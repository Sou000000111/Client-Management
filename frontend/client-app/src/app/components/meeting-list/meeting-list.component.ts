import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { CommonModule, NgClass, DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, NgClass, DatePipe],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.css']
})
export class MeetingListComponent implements OnInit {

  meetings: any[] = [];
  loading = true;

  constructor(
    private meetingService: MeetingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings() {
    this.meetingService.getMeetings().subscribe({
      next: (res) => {
        this.meetings = [...res];   // force UI change
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteMeeting(id: number) {
    if (!confirm("Delete this meeting?")) return;

    this.meetingService.deleteMeeting(id).subscribe(() => {
      this.loadMeetings();
    });
  }

  markCompleted(id: number) {
    this.meetingService.updateMeetingStatus(id, "completed").subscribe(() => {
      this.loadMeetings();
    });
  }

  getStatus(meeting: any): string {
  if (!meeting.meetingDate || !meeting.meetingTime) return 'Unknown';

  const meetingDateTime = new Date(`${meeting.meetingDate}T${meeting.meetingTime}`);

  const now = new Date();

  return meetingDateTime < now ? 'Completed' : 'Upcoming';
}

}
