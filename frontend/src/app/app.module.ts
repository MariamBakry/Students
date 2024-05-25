import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { HomeComponent } from './home/home.component';

import { AuthInterceptor } from './auth.interceptor';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponentComponent,
    EditStudentComponentComponent,
    DeleteStudentComponentComponent,
    StudentsComponentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ConfigService, provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
