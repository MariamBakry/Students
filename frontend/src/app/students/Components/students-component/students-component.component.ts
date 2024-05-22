import { Component } from '@angular/core';
import { Student } from '../../student.model';
import { StudentService } from '../../Services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentComponentComponent } from '../add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from '../edit-student-component/edit-student-component.component';

@Component({
  selector: 'app-students-component',
  templateUrl: './students-component.component.html',
  styleUrl: './students-component.component.css'
})
export class StudentsComponentComponent {
  Students:any;
  constructor(private modalService: NgbModal, private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      {
        next:(data:any)=>{
          this.Students = data;

        },
        error:(err)=>{console.log(err)}
      }
    )
  }

  getStudents(): void {
    this.studentService.getAllStudents()
      .subscribe(students => this.Students = students);
  }
  
  addStudentModal() {
    const modalRef = this.modalService.open(AddStudentComponentComponent, { centered: true });
  }

  editStudentModal() {
    const modalRef = this.modalService.open(EditStudentComponentComponent, { centered: true });
  }
}
