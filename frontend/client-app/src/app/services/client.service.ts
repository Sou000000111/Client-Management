import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private api = 'http://localhost:3000/api/clients';  // ✔ FIXED URL

  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  addClient(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  updateClient(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}

