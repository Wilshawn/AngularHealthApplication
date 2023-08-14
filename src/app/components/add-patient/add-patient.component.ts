import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from 'src/app/services/http-provider.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  addPatientForm: patientForm = new patientForm();

  @ViewChild("patientForm")
  patientForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  AddPatient(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.savePatient(this.addPatientForm).subscribe({
        error: () => {
          this.toastr.error("something went wrong");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        },
        complete: () => {
          this.toastr.success("Patient has been added!");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      });
    }
  }
}

export class patientForm {
  name: string = "";
  username: string = "";
  email: string = "";
  street: string = "";
  suite: string = "";
  city: string = "";
  zipcode: string = "";
  phone: string = "";
}