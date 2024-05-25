import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-delete-student-component',
  templateUrl: './delete-student-component.component.html',
  styleUrl: './delete-student-component.component.css'
})
export class DeleteStudentComponentComponent {
  @Input() id: number;
  token: string;
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private modalService: NgbModal, private studentService:StudentService) {}

  closeModal() {
    this.modalService.dismissAll();
  }
  deleteStudent(): void {
    this.token = localStorage.getItem('jwtToken');
    if(this.token){
      this.studentService.deleteStudent(this.id, this.token)
      .subscribe(() => {
          this.closeModal()
          this.onDelete.emit(true);
          console.log('Student deleted successfully');
        },
        error => {
          console.error('Error deleting student:', error);
        }
      );
    } else {
      console.error('No token found');
    }
    
  }
}
