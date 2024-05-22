import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';

import { AppComponent } from './app.component';
import { AddStudentComponentComponent } from './students/Components/add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from './students/Components/edit-student-component/edit-student-component.component';
import { DeleteStudentComponentComponent } from './students/Components/delete-student-component/delete-student-component.component';
import { StudentsComponentComponent } from './students/Components/students-component/students-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponentComponent,
    EditStudentComponentComponent,
    DeleteStudentComponentComponent,
    StudentsComponentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
