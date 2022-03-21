export class UsersModule { }import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StudentRoutingModule
    ],
    declarations: [
        StudentComponent,
        StudentListComponent,
        AddStudentComponent,
    ]
})
export class StudentModule {
}



