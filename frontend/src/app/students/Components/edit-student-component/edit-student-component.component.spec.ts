import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentComponentComponent } from './edit-student-component.component';

describe('EditStudentComponentComponent', () => {
  let component: EditStudentComponentComponent;
  let fixture: ComponentFixture<EditStudentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStudentComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStudentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
