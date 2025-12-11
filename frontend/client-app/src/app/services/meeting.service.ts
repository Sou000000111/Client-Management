import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private api = 'http://localhost:3000/api/meetings';

  constructor(private http: HttpClient) {}

 getMeetings(): Observable<any[]> {
  return this.http.get<any[]>(this.api + '?sort=desc');
}


  addMeeting(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  updateMeetingStatus(id: number, status: string) {
  return this.http.patch(`${this.api}/${id}`, { status });
}


  deleteMeeting(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
