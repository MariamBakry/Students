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
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponentComponent,
    EditStudentComponentComponent,
    DeleteStudentComponentComponent,
    StudentsComponentComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // ToastrModule.forRoot({
    //   closeButton: true,
    //   progressBar: true,
    //   progressAnimation: 'increasing'
    // })
  ],
  providers: [ConfigService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
