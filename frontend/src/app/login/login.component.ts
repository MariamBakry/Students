import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError:string = '';

  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Login successful:', response);
        localStorage.setItem('jwtToken', response.token);
        this.authService.setLoggedIn(true); 
        this.router.navigateByUrl('/students');
        
        const username = this.username;
        localStorage.setItem('username', username);
        this.closeModal()
      }, error => {
        this.loginError = 'Invalid credentials';
      });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
