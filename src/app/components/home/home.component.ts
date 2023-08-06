import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from 'src/app/services/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">x</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
      <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
    </div>
  `
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  searchText = '';
  patientList: any = [];
  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    if (localStorage.getItem('search-query')) {
      this.searchPatient(localStorage.getItem('search-query'));
    } else {
      this.getAllPatient();
    }

  }
  async getAllPatient() {
    localStorage.removeItem('search-query');
    this.httpProvider.getAllPatient().subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.patientList = resultData;
        }
      }
    },
    (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if (error.error && error.error.message) {
            this.patientList = [];
          }
        }
      }
    });
  }

  search(query: any) {
    localStorage.setItem('search-query', query);
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  async searchPatient(query: any) {
    this.httpProvider.searchPatient(query).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.patientList = resultData;
        }
      }
      this.searchText = query;
    },
    (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if (error.error && error.error.message) {
            this.patientList = [];
          }
        }
      }
    });
  }

  AddPatient() {
    this.router.navigate(['AddPatient']);
  }

  deletePatientConfirmation(patient: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deletePatient(patient);
      },
        (reason) => {});
  }

  deletePatient(patient: any) {
    this.httpProvider.deletePatient(patient.id).subscribe({
      error: () => {
        this.toastr.error("something went wrong");
        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      complete: () => {
        this.toastr.success("Patient has been deleted!");
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    });
  }
}
