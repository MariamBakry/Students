import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-student-component',
  templateUrl: './add-student-component.component.html',
  styleUrl: './add-student-component.component.css'
})
export class AddStudentComponentComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthDate: null,
    country: ''
  };

  countries = [
    { id: 1, name: 'Cairo' },
    { id: 2, name: 'Alexandria' },
    { id: 3, name: 'Giza' },
    { id: 4, name: 'Sharkia' },
    { id: 5, name: 'Qalyubia' },
    { id: 6, name: 'Asyut' },
    { id: 7, name: 'Suez' },
    { id: 8, name: 'Luxor' },
    { id: 9, name: 'Aswan' },
    { id: 10, name: 'Port Said' }
  ];

  constructor(private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll();
  }

  submitForm() {
    console.log(this.formData);
    this.closeModal();
  }

  checkboxStatus: string = 'inactive';

  updateStudentStatus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.checkboxStatus = inputElement.checked ? 'active' : 'inactive';
  }
}
