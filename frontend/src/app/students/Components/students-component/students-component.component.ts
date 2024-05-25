import { Component , OnInit  } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentComponentComponent } from '../add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from '../edit-student-component/edit-student-component.component';
import { DeleteStudentComponentComponent } from '../delete-student-component/delete-student-component.component';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-students-component',
  templateUrl: './students-component.component.html',
  styleUrl: './students-component.component.css'
})

export class StudentsComponentComponent implements OnInit {
  students: any = [];
  constructor(private studentService: StudentService, private modalService: NgbModal) {}
  token = localStorage.getItem('jwtToken');
  ngOnInit() {
    this.getStudents();
    this.studentService.students$.subscribe(students => {
      this.students = students;
    });
  }

  loadStudents() {
    this.studentService.getAllStudents(this.token).subscribe();
  }

  getStudents(): void {
    if (this.token) {
      this.studentService.getAllStudents(this.token).subscribe(
        data => {
          this.students = data;
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }
  
  addStudentModal() {
    const modalRef = this.modalService.open(AddStudentComponentComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.loadStudents();
      }
    }).catch((error) => {});
  }

  editStudentModal(id:number, student:Student) {
    const modalRef = this.modalService.open(EditStudentComponentComponent, { centered: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.student = student;
    modalRef.result.then(
      () => this.loadStudents(),
      () => this.loadStudents()
    );
  }

  deleteStudentModal(id:number) {
    const modalRef = this.modalService.open(DeleteStudentComponentComponent, { centered: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onDelete.subscribe((result: boolean) => {
      if (result) {
        this.loadStudents();
      }
    }).catch((error) => {});
  }
}