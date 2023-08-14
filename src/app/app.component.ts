import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularHealthApplication';
  name = this.auth.getName();
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  HomeClick() {
    if (localStorage.getItem('search-query') && this.router.url == '/Home') {
      localStorage.removeItem('search-query');
      location.reload();
    } else {
      localStorage.removeItem('search-query');
      this.router.navigate(['/Home']);
    }
  }
  signOut() {
    localStorage.removeItem('loggedIn');
    setTimeout(() => {
      location.reload()
    }, 500);
  }
}
