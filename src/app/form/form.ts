import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emp, Employee } from '../apis/employee';
interface Employeeform {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  gender: FormControl<string | null>;
  phone: FormControl<string | null>;
  salary: FormControl<number | null>;
  city: FormControl<number | null>;

}
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

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
 onSubmit() {
  const id = this.form.value.id;

  if (id) {
    // ✅ UPDATE existing record
    this.employees.updateEmployee(id, this.form.value as Emp)
      .subscribe(() => {
        alert('Record JSON server ma UPDATE thai gayo');
        this.form.reset();
      });
  } else {
    // ✅ ADD new record
    this.employees.createEmployee(this.form.value as Emp)
      .subscribe(() => {
        alert('Employee Added');
        this.form.reset();
      });

  }
  
}


}
