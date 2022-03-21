import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { StudentDTO } from 'src/app/data/student.data';
import { StudentService } from 'src/app/services';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentServices: StudentService,) { }
  ngOnInit(

  ): void {
    this.form = this.formBuilder.group({
      studentName: ['', Validators.required],
      studentClass: ['', Validators.required],
    });

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    let data = {
      studentName: localStorage.getItem('studentName'),
      studentClass: localStorage.getItem('studentClass'),
    }
    this.form.patchValue(data)
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createStudent();
    } else {
      this.updateStudent();
    }
  }
  private createStudent() {
    this.studentServices.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        alert("Add student successfully !")
        this.router.navigate(['students']);
      })
      .add(() => this.loading = false);
  }

  private updateStudent() {
    let data: StudentDTO;
    data = {
      studentID: this.id,
      studentName: this.form.value.studentName,
      studentClass: this.form.value.studentClass,
    }
    this.studentServices.update(data)
      .pipe(first())
      .subscribe(() => {
        alert("Update student successfully !")
        this.router.navigate(['students']);
      })
      .add(() => this.loading = false);
  }

}
