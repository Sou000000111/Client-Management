import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [NgIf, NgForOf, DatePipe],
  templateUrl: './client-list.component.html',
  styleUrls : ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: any[] = [];

  constructor(
    private clientService: ClientService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
  this.clientService.getClients().subscribe((res: any) => {
    this.clients = [...res];
    this.cdr.detectChanges();   // <-- UI FORCE UPDATE
  });
}


  addClient() {
    this.router.navigate(['/create-client']);
  }

  editClient(id: number) {
    this.router.navigate(['/create-client'], {
      queryParams: { id }
    });
  }

  deleteClient(id: number) {
  if (!confirm("Are you sure?")) return;

  this.clientService.deleteClient(id).subscribe({
    next: (res) => {
      // UI ko turant refresh karne ka best tariqa:
      this.loadClients();  

      alert("Client deleted!");
    },
    error: (err) => {
      console.error(err);
      alert("Delete failed!");
    }
  });
}

}
