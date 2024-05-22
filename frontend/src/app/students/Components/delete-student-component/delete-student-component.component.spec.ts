import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudentComponentComponent } from './delete-student-component.component';

describe('DeleteStudentComponentComponent', () => {
  let component: DeleteStudentComponentComponent;
  let fixture: ComponentFixture<DeleteStudentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteStudentComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteStudentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
