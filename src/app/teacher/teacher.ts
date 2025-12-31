import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from "../shared/form/form";
import { Table } from "../shared/table/table";
import { TeacherService } from '../apis/teacher-service';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-teacher',
  imports: [ Form,Table],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher {

  private cdr = inject(ChangeDetectorRef);
 private teacherService = inject(TeacherService);


  teacher$!: Observable<any[]>;
  editTeacher: any = null;

  ngOnInit() {
    this.loadTeacher();
  }

  // 🔹 SIMPLE LOAD
  loadTeacher() {
    this.teacher$ = this.teacherService.getAll();
  }

  // ➕ ADD
  async addTeacher(data: any) {
    await firstValueFrom(this.teacherService.add(data));
    alert('Teacher Added Successfully');
    this.loadTeacher();
    this.cdr.detectChanges();
  }

  // ✏️ UPDATE
  async updateTeacher(data: any) {
    await firstValueFrom(this.teacherService.update(data.id, data));
    this.editTeacher = null;
    this.loadTeacher();
    this.cdr.detectChanges();
  }

  // ❌ DELETE
  async deleteTeacher(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      await firstValueFrom(this.teacherService.delete(id));
      this.loadTeacher();
    }
  }

  // ✏️ Edit mode
  edit(data: any) {
    this.editTeacher = { ...data };
  }

  protected readonly router = inject(Router);
  gotodashboard() {
    this.router.navigate(['dashboard']);
  }

}
