import { Component , OnInit  } from '@angular/core';
import { Student } from '../../student.model';
import { StudentService } from '../../Services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentComponentComponent } from '../add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from '../edit-student-component/edit-student-component.component';
import { ApiService } from '../../../Services/api.service';
@Component({
  selector: 'app-students-component',
  templateUrl: './students-component.component.html',
  styleUrl: './students-component.component.css'
})
export class StudentsComponentComponent implements OnInit {
  // students: any[] = [];
  students: any = [];
  filteredStudents: any[] = [];
  constructor(private studentService: StudentService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAllStudents()
    .subscribe(data => {
      this.students = data;
    });
  }
  

  // addStudent() {
  //   this.studentService.createStudent(this.student).subscribe(() => {
  //     this.getStudents();
  //   });
  // }

  // updateStudent(ev: MatSelectChange, studentId: number, index: number) {
  //   const value = ev.value;
  //   this.apiService.updateStatus(value, todoId).subscribe(todo => {
  //     this.todos[index] = todo;
  //     this.filteredTodos = this.todos;
  //   });
  // }

  // deleteStudent(id: number) {
  //   if(confirm('Are you sure you want to delete this student?')){
  //     this.apiService.deleteStudent(id).subscribe(res => {

  //       // @ts-ignore
  //       if (res.success) {
  //         this.students = this.students.filter((t: any) => t.id !== id);
  //         this.filteredStudents = this.students;
  //       }
  //     });
  //   }
  // }
  
  addStudentModal() {
    const modalRef = this.modalService.open(AddStudentComponentComponent, { centered: true });
  }

  editStudentModal() {
    const modalRef = this.modalService.open(EditStudentComponentComponent, { centered: true });
  }
}
