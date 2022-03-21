import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student.component';


const routes: Routes = [
    {
        path: '', component: StudentComponent,
        children: [
            { path: '', component: StudentListComponent },
            { path: 'add', component: AddStudentComponent },
            { path: 'edit/:id', component: AddStudentComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }