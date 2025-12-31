import { ChangeDetectorRef, Component, inject ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '../shared/form/form';
import { Table } from "../shared/table/table";
import { StudentService } from '../apis/student-service';
import { FormsModule } from '@angular/forms';

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

  students: any[] = [];
  editStudent: any = null;
  id: any;

  ngOnInit() {
    this.loadStudents();
  }
  // 1. Load Data
  loadStudents() {
    this.studentService.getAll().subscribe(res => {
      this.students = res;
      this.cdr.detectChanges(); // 🔥 Force UI refresh
    });
  }
  // 2. Add Student (Push directly to list)
  addStudent(data: any) {
    this.studentService.add(data).subscribe(res => {
      alert('Student Added Successfully');
      this.students.push(res); // 🔥 Add to array manually
      this.cdr.detectChanges();
    });
  }
  // 3. Update Student (Manual index update)
  updateStudent(data: any) {
    const id = data.id;

    this.studentService.update(id, data).subscribe(res => {
      alert('Student Updated Successfully');

      // 🔥 Update local array
      const index = this.students.findIndex(s => s.id === id);
      if (index !== -1) {
        this.students[index] = res;
      }

      this.editStudent = null;
      this.cdr.detectChanges();
    });
  }
  // 4. Delete Student (Traditional loop and splice)
  deleteStudent(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.studentService.delete(id).subscribe(() => {
        alert('Student Deleted Successfully');

        // Traditional loop to remove item
        for (let i = 0; i < this.students.length; i++) {
          if (this.students[i].id === id) {
            this.students.splice(i, 1); // 🔥 Splice from array
            break;
          }
        }

        this.cdr.detectChanges();
      });
    }
  }
  //  Setup for Edit Mode
  edit(data: any) {
    this.editStudent = { ...data };
  }
  protected readonly router = inject(Router);
  gotodashboard() {
    this.router.navigate(['dashboard']);
  }
}