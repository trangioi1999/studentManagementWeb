import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const studentModule = () => import('./student/studentModule').then(x => x.StudentModule);

const routes: Routes = [
    { path: 'students', loadChildren: studentModule },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }