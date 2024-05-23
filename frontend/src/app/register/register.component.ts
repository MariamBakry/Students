import { Component } from '@angular/core';
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
  showForm: boolean = true;

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  register() {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe(response => {
        console.log('User registered successfully:', response);
        this.modalService.dismissAll();
      }, error => {
        console.error('Registration error:', error);
      });
  }

  closeForm() {
    this.modalService.dismissAll();
  }
}
