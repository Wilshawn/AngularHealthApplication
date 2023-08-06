import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    console.log(localStorage.getItem('loggedIn'));
    return !!localStorage.getItem('loggedIn');
  }
  getName() {
    return localStorage.getItem('loggedIn');
  }
}
