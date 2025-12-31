import { Component, EventEmitter,  Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { Student } from '../../student/student';
interface forms {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  phone: FormControl<number | null>;
  email: FormControl<string | null>;
  address: FormControl<string | null>;
  gender: FormControl<string | null>;
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnChanges {
  @Input() editData: any = null;
  @Output() added = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();
  forms = new FormGroup({
    // 1. Added Validators.required so ID cannot be empty
    id: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/)]),
    address: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  });

   ngOnChanges(changes: SimpleChanges) {
    if (changes['editData']?.currentValue) {
      this.forms.patchValue(this.editData);
      this.forms.get('id')?.disable();
    } else {
      this.forms.reset({ gender: 'male' });
      this.forms.get('id')?.enable();
    }
  }

  submit() {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }

    const data = this.forms.getRawValue();

    if (this.editData) {
      this.updated.emit(data);   // ✏️ edit
    } else {
      this.added.emit(data);     // ➕ add
    }

    this.forms.reset({ gender: 'male' });
  }
}
