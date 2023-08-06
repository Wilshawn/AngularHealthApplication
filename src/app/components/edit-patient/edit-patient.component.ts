import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from 'src/app/services/http-provider.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  editPatientForm: patientForm = new patientForm();

  @ViewChild("patientForm")
  patientForm!: NgForm;

  isSubmitted: boolean = false;
  patientId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.getPatientDetailById();
  }
  getPatientDetailById() {
    this.httpProvider.getPatientDetailById(this.patientId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editPatientForm.Id = resultData.id;
          this.editPatientForm.firstName = resultData.firstName;
          this.editPatientForm.lastName = resultData.lastName;
          this.editPatientForm.email = resultData.email;
          this.editPatientForm.address = resultData.address;
          this.editPatientForm.phone = resultData.phone;
          this.editPatientForm.notes = resultData.notes;
        }
      }
    },
      (error: any) => { });
  }

  EditPatient(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.updatePatient(this.editPatientForm).subscribe({
        error: () => {
          this.toastr.error("something went wrong");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        },
        complete: () => {
          this.toastr.success("Updated Patient!");
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      });
    }
  }
}

export class patientForm {
  Id: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  notes: string = "";
}
