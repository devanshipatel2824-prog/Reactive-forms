import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emp, Employee } from '../apis/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { firstValueFrom, map, Observable } from 'rxjs';
interface Employeeform {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  gender: FormControl<string | null>;
  phone: FormControl<string | null>;
  salary: FormControl<number | null>;
  city: FormControl<string | null>;

}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  employee$!: Observable<Emp[]>;
  private employees = inject(Employee);
  form = new FormGroup<Employeeform>({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    email: new FormControl(null,
      [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/)
      ]),
    gender: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]),
    salary: new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(10000)]),
    city: new FormControl(null, Validators.required)
  })
  employeeList: Emp[] = [];
  isEditMode = false;

  ngOnInit() {
    this.loadEmployees();
  }
   loadEmployees(): void {
    console.log("Observable");
    this.employee$ = this.employees.getEmployee();
    this.cdr.detectChanges();
  }
  // Add new employee
  async onSubmit() {
    if (!this.form.valid) return;
    await firstValueFrom(
      this.employees.createEmployee(this.form.value as Emp)
    );
    alert('Employee Added Successfully');
    this.form.reset();
    this.loadEmployees();
  }

  // Populate form for editing
  editEmployee(emp: Emp) {
    this.isEditMode = true;
    this.form.setValue({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      gender: emp.gender,
      phone: emp.phone,
      salary: emp.salary,
      city: emp.city
    });
  }

 async updateEmployee() {
  const id = this.form.value.id;
  if (!id) return;

  try {
    await firstValueFrom(
      this.employees.updateEmployee(id, this.form.value as Emp)
    );

    alert('Employee Updated Successfully');
    this.form.reset();
    this.isEditMode = false;
    this.loadEmployees();

  } catch (error) {
    console.error('Update Error:', error);
    alert('Failed to update employee');
  }
}

  //  DELETE
  async deleteEmployee(id: string | null) {
    if (!id) return;

    await firstValueFrom(
      this.employees.deleteEmployee(id)
    );

    alert('Employee Deleted Successfully');
    this.loadEmployees();
  }


  cancelEdit() {
    this.form.reset();
    this.isEditMode = false;
  }
}


