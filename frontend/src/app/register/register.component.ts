import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessages: string[] = [];

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  register() {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe(response => {
        console.log('User registered successfully:', response);
        this.closeForm()
      }, error => {
        if (error.error && error.error.message && Array.isArray(error.error.message)) {
          this.errorMessages = error.error.message;
        } else {
          this.errorMessages = ['An error occurred during registration. Please try again.'];
        }
      });
  }

  closeForm() {
    this.modalService.dismissAll();
  }
}
