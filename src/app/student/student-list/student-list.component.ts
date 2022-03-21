import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Student, StudentDetailDTO, StudentDTO } from 'src/app/data/student.data';
import { StudentService } from 'src/app/services';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  @Output() submitted = new EventEmitter<StudentDTO>()
  studentList: StudentDetailDTO[] = [];
  destroyed$ = new Subject<boolean>()
  abc!: StudentDTO;
  constructor(private studentService: StudentService, private router:Router, private activatedRoute:ActivatedRoute ) { }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

  ngOnInit() {
    this.studentService.getAll()
      .pipe()
      .subscribe(it => {
          this.studentList = it["studentList"]
      });
  }

  deleteStudent(id: string) {
    const student = this.studentList.find(x => x.studentID === id);
    if (!student) return;
    this.studentService.delete(id)
      .pipe(first())
      .subscribe(() => this.studentList = this.studentList.filter(x => x.studentID !== id));
  }

  onShowOrderDetail(student: StudentDTO) {
    localStorage.setItem('studentClass',student.studentClass)
    localStorage.setItem('studentName',student.studentName)
  }
    
}
