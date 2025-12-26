import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
interface Employeeform {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  gender: FormControl<string | null>;
  phone: FormControl<string | null>;
  salary: FormControl<number | null>;
  city: FormControl<number | null>;

}
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  form = new FormGroup<Employeeform>({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null,
      [Validators.required,
      Validators.pattern('/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/')
      ]),
    gender: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]),
    salary: new FormControl(null, [Validators.required,Validators.min(1000),Validators.max(10000)]),
    city: new FormControl(null, Validators.required)
  })

  onSubmit() {
    console.log(this.form.value);
  }

}
// Validators.pattern(/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/)
