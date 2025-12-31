import { Component, EventEmitter,  Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
      // Optional: Disable ID field during edit so user can't change the primary key
      this.forms.get('id')?.disable();
    } else {
      this.forms.reset({ gender: 'male' });
      this.forms.get('id')?.enable();
    }
  }

  submit() {
    if (this.forms.valid) {
      // 2. getRawValue() is essential here to capture the ID if it is disabled
      const formData = this.forms.getRawValue();

      // 3. Logic check: If editData exists, we are updating. Otherwise, adding.
      if (this.editData) {
        this.updated.emit(formData);
      } else {
        this.added.emit(formData);
      }

      this.forms.reset({ gender: 'male' });
    } else {
      this.forms.markAllAsTouched();
    }
  }
}
