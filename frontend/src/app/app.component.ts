import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from './Services/home.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'home';

  constructor(private modalService: NgbModal, private homeService: HomeService) {}

  registerModal() {
    const modalRef = this.modalService.open(RegisterComponent, { centered: true });
  }

  loginModal() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
  }
}
