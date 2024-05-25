import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '../Services/home.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { StudentsComponentComponent } from '../students/Components/students-component/students-component.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private modalService: NgbModal, private homeService: HomeService) {}

  registerModal() {
    this.modalService.open(RegisterComponent, { centered: true });
  }

  loginModal() {
    this.modalService.open(LoginComponent, { centered: true });
  }
  
}
