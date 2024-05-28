import { Component , OnInit  } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentComponentComponent } from '../add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from '../edit-student-component/edit-student-component.component';
import { DeleteStudentComponentComponent } from '../delete-student-component/delete-student-component.component';
import { Student } from '../../../models/student.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-students-component',
  templateUrl: './students-component.component.html',
  styleUrl: './students-component.component.css'
})

export class StudentsComponentComponent implements OnInit {
  students: any = [];
  totalStudents: number;
  p: number = 1;
  itemsPerPage: number = 10;

  constructor(private authService: AuthService,private studentService: StudentService, private modalService: NgbModal, private router: Router) {}
  token = localStorage.getItem('jwtToken');
  ngOnInit() {
    if (!this.token) {
      console.error('No token found');
      this.router.navigateByUrl('');
    } else {
      this.getStudents();
    }
  }

  loadStudents() {
    this.getStudents()
  }

  getStudents(): void {
    if (this.token) {
      this.studentService.getAllStudents(this.token).subscribe(
        data => {
          if (data) {
            this.students = data;
            this.totalStudents = data.length;
          }
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
      if (result === 'added') {
        this.loadStudents();
      }
    }).catch((error) => {
      console.error('Error during adding student modal:', error);
    });
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
    modalRef.result.then((result) => {
      if (result === 'deleted') {
        console.log(result)
        this.loadStudents();
      }
    }).catch((error) => {
      console.error('Error during deletion:', error);
    });
  }

  onPageChange(page: number) {
    this.p = page;
    this.getStudents();
  }

  getPagesArray(): number[] {
    const totalPages = this.totalPages();
    if (totalPages <= 0) {
      return [];
    }
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }  

  totalPages(): number {
    return Math.ceil(this.totalStudents / this.itemsPerPage);
  }

  logout() {
    this.authService.logout();
  }
}