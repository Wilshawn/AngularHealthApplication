import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from 'src/app/services/http-provider.service';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {
  patientId: any;
  patientDetail : any= [];

  constructor(public WebApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.getPatientDetailById();
  }

  getPatientDetailById() {
    this.httpProvider.getPatientDetailById(this.patientId).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.patientDetail = resultData;
        }
      }
    },
      (error :any)=> { });
  }
}
