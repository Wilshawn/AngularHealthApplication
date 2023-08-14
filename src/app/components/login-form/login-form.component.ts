import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from 'src/app/services/http-provider.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm: signInForm = new signInForm();

  @ViewChild("signInForm")
  signInForm!: NgForm;
  patientForm!: NgForm;
  isSubmitted: boolean = false;

  userName: string = '';


  validUsers = [
    {
      'username':'info@admin.com', 'password': 'admin', 'name':'Admin'
    }
  ]
  showError: boolean = false;
  showSuccess: boolean = false;
  flag: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  authenticate() {
    console.log('button clicked');
    this.isSubmitted = true;
    this.flag = false;

    for (var i in this.validUsers) {
      if (this.loginForm.username == this.validUsers[i].username && this.loginForm.password == this.validUsers[i].password) {
        this.flag = true;
        this.userName = this.validUsers[i].name;
        break;
      } else {
        this.flag = false;
      }
    }

    if (this.flag) {
      this.showError = false;
      this.showSuccess = true;
      this.toastr.success("Login Successful!");
      localStorage.setItem("loggedIn", this.userName);
      setTimeout(() => {
        this.router.navigate(['/'])
        .then(() => {
          location.reload()
        });
      }, 500);
    } else {
      this.showError = true;
      this.showSuccess = false;
      this.toastr.error("Login Failed");
    }
  }
}

export class signInForm {
  username: string = "";
  password: string = "";
}