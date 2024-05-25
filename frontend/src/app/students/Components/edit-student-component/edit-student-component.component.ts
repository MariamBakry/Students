import { Component , EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../Services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student-component',
  templateUrl: './edit-student-component.component.html',
  styleUrl: './edit-student-component.component.css'
})
export class EditStudentComponentComponent {
  @Input() id: number;
  @Input() student: Student;
  countries = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Luxor',
    'Aswan',
    'Other'
  ];
  birthDateError:string;

  objectDate: any;

  constructor(private modalService: NgbModal, private studentService:StudentService) {}

  ngOnInit(): void {
    this.objectDate = this.student.birthDate;
    this.dateToCustomObject()
  }

  editStudent() {
    if (!this.student.firstName || !this.student.lastName || !this.student.email || !this.student.country || !this.student.gender) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!this.isValidEmail(this.student.email)) {
      return;
    }
    this.student.birthDate = this.isValidDateObject();
    if (!this.isValidBirthDate(this.student.birthDate)) {
      this.birthDateError = 'Please enter a valid date.';
      return;
    }

    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.studentService.updateStudent(this.id, this.student, token)
      .subscribe(response => {
          this.closeModal();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  isValidDateObject(){
    if (this.objectDate && typeof this.objectDate === 'object') {
      const { year, month, day } = this.objectDate as { year: number, month: number, day: number };
      return new Date(year, month - 1, day);
    }
  }

  updateStudentStatus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.student.status = inputElement.checked ? 'Active' : 'InActive';
  }

  dateToCustomObject(): void {
    console.log(this.student.birthDate)
    let birthDate = this.student.birthDate;
    if (typeof birthDate === 'string') {
      this.objectDate = this.convertDateToObject(birthDate);
    }
  }

  convertDateToObject(date: Date): { year: number, month: number, day: number } {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return { year, month, day }; 
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  isValidBirthDate(birthDate: Date): boolean {
    const currentDate = new Date();
    const minValidYear = 1920;
    return birthDate <= currentDate && birthDate.getFullYear() >= minValidYear;
  }
}
