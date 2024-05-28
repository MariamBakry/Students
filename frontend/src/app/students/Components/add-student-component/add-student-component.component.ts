import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { Student } from '../../../models/student.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-student-component',
  templateUrl: './add-student-component.component.html',
  styleUrl: './add-student-component.component.css'
})
export class AddStudentComponentComponent {
  newStudent: Student = {
    firstName: '',
    lastName: '',
    country: '',
    birthDate: { year: 0, month: 0, day: 0 },
    email: '',
    gender: '',
    status: 'InActive'
  };
  countries = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Luxor',
    'Aswan',
    'Other'
  ];
  birthDateError:string;
  requiredInputError:string;
  formInvalid:boolean;

  constructor(private activeModal: NgbActiveModal,private modalService: NgbModal, private studentService:StudentService) {}

  closeModal() {
    this.activeModal.close('added');
    this.modalService.dismissAll();
  }


  addStudent(form: NgForm) {
    if (form.invalid) {
      this.formInvalid = true;
      return;
    }
    this.newStudent.birthDate = this.isValidDateObject();

    if (!this.isValidBirthDate(this.newStudent.birthDate)) {
      this.birthDateError = 'Please enter a valid date.';
      return;
    }

    const token = localStorage.getItem('jwtToken');
    if (token) {
        this.studentService.createStudent(this.newStudent, token).subscribe(() => {
        this.closeModal();
      },
      error => {
        console.error('Error fetching students:', error);
      });
    } else {
        console.error('No token found');
      }
  }

  isValidDateObject(){
    let birthDate = this.newStudent.birthDate;
    if (birthDate && typeof birthDate === 'object') {
      const { year, month, day } = birthDate as { year: number, month: number, day: number };
      return new Date(year, month - 1, day);
    }
  }

  updateStudentStatus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.newStudent.status = inputElement.checked ? 'Active' : 'InActive';
  }

  isValidBirthDate(birthDate: Date): boolean {
    const currentDate = new Date();
    const minValidYear = 1920;
    return birthDate <= currentDate && birthDate.getFullYear() >= minValidYear;
  }
}
