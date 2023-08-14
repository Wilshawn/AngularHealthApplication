import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "https://jsonplaceholder.typicode.com/users"
//var apiUrl = "http://localhost:3000/patients";

var httpLink =  {
  getAllPatient: apiUrl,
  deletePatient: apiUrl,
  getPatientDetailById: apiUrl,
  savePatient: apiUrl,
  updatePatient: apiUrl
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private WebApiService: WebApiService) { }

  public getAllPatient(): Observable<any> {
    return this.WebApiService.get(httpLink.getAllPatient);
  }
  public searchPatient(query: any): Observable<any> {
    return this.WebApiService.get(httpLink.getAllPatient + '?q=' + query);
  }
  public deletePatient(model: any): Observable<any> {
    return this.WebApiService.delete(httpLink.deletePatient + '/' + model);
  }
  public getPatientDetailById(model: any): Observable<any> {
    return this.WebApiService.get(httpLink.getPatientDetailById + '/' + model);
  }
  public updatePatient(body: any): Observable<any> {
    return this.WebApiService.put(httpLink.getPatientDetailById + '/' + body.Id, body);
  }
  public savePatient(model: any): Observable<any> {
    return this.WebApiService.post(httpLink.savePatient, model);
  }
}
