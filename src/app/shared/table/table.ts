import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

}
