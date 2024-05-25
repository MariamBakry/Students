import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { Student } from '../../../models/student.model';

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

  constructor(private modalService: NgbModal, private studentService:StudentService) {}

  closeModal() {
    this.modalService.dismissAll();
  }


  addStudent() {
    if (!this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.email || !this.newStudent.country || !this.newStudent.gender) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isValidDateObject()
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.studentService.createStudent(this.newStudent, token).subscribe(() => {
        this.closeModal();
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  } else {
      console.error('No token found');
    }
  }

  isValidDateObject(){
    let birthDate = this.newStudent.birthDate;
    if (birthDate && typeof birthDate === 'object') {
      const { year, month, day } = birthDate as { year: number, month: number, day: number };
      this.newStudent.birthDate = new Date(year, month - 1, day);
    }
  }

  updateStudentStatus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.newStudent.status = inputElement.checked ? 'Active' : 'InActive';
  }
}
