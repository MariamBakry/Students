import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    username: '',
    password: ''
  };

  constructor(private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll();
  }

  submitForm() {
    console.log(this.formData);
    this.closeModal();
  }
}
