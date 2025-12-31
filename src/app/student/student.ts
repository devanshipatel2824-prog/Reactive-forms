import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '../shared/form/form';
import { Table } from "../shared/table/table";
import { StudentService } from '../apis/student-service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [Table, FormsModule, Form],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private studentService = inject(StudentService);

  // students: any[] = [];
  editStudent: any = null;
  id: any;
  student$!: Observable<Student[]>;
  ngOnInit() {
    this.loadStudents();
  }

  //  SIMPLE LOAD
  loadStudents() {
    this.student$ = this.studentService.getAll();
  }

  async addStudent(data: any) {
  await firstValueFrom(this.studentService.add(data));
  alert('Student Added Successfully');   //  you will SEE it
  this.loadStudents();
    this.cdr.detectChanges();
}


  //  UPDATE
  async updateStudent(data: any) {
    await firstValueFrom(this.studentService.update(data.id, data));
    this.editStudent = null;
    this.loadStudents();   
    this.cdr.detectChanges();  //  simple reload
  }

  //  DELETE
  async deleteStudent(id: any) {
    if (confirm('Are you sure?')) {
      await firstValueFrom(this.studentService.delete(id));
      this.loadStudents();   //  simple reload
    }
  }

  edit(data: any) {
    this.editStudent = { ...data };
  }

  protected readonly router = inject(Router);
  gotodashboard() {
    this.router.navigate(['dashboard']);
  }
}