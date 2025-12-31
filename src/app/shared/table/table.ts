import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../student/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-table',
  imports: [AsyncPipe,FormsModule,CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() data!: Observable<any[]>; // Observable from parent
  @Output() edit = new EventEmitter<Student>();
  @Output() remove = new EventEmitter<number>();
}
