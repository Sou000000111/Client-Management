import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  clientForm!: FormGroup;
  editId: number | null = null;   // 🔥 Ensure it stores null when no ID

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // FORM CREATE
    this.clientForm = this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      email: [''],
      gender: [''],
      dob: [''],
      address: [''],
      password: ['']        // password only for ADD
    });

    // CHECK IF EDIT MODE
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editId = +params['id'];
        this.loadClient(this.editId);
      }
    });
  }

  // LOAD CLIENT DATA FOR EDIT
  loadClient(id: number) {
    this.clientService.getClientById(id).subscribe((res: any) => {
      console.log("EDIT MODE DATA:", res);

      // Fix date format (remove time)
      if (res.dob) {
        res.dob = res.dob.split('T')[0];
      }

      this.clientForm.patchValue(res);

      // 🔥 Remove password field in EDIT mode (optional clean)
      this.clientForm.get("password")?.reset();
    });
  }

  // FIX dd-mm-yyyy → yyyy-mm-dd
  private fixDate(date: string): string {
    if (!date) return date;

    if (date.includes("-")) {
      const p = date.split("-");
      if (p[0].length === 2) return `${p[2]}-${p[1]}-${p[0]}`;
    }
    return date;
  }

  // 🚀 MAIN SUBMIT METHOD (Add + Update combined)
  updateClient() {

    if (!this.clientForm.valid) {
      alert("Please fill all fields");
      return;
    }

    let data = this.clientForm.value;

    // Convert DOB before sending
    data.dob = this.fixDate(data.dob);

    // --------------- ADD CLIENT MODE --------------- //
    if (!this.editId) {

      // Password REQUIRED in Add mode
      if (!data.password) {
        alert("Password is required!");
        return;
      }

      this.clientService.addClient(data).subscribe({
        next: () => {
          alert("Client added successfully!");
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error(err);
          alert("Failed to add client");
        }
      });

      return;
    }

    // --------------- UPDATE CLIENT MODE --------------- //

    delete data.password;   // 🔥 DO NOT send password during update

    this.clientService.updateClient(this.editId, data).subscribe({
      next: () => {
        alert("Client updated successfully!");
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update client");
      }
    });

  }

}
