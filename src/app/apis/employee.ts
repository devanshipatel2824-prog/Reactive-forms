import { inject, Injectable } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Form } from '../form/form';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Emp {
  id: string | null;
  name: string | null;
  email: string | null;
  gender: string | null;
  phone: string | null;
  salary: number | null;
  city: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Employee {
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/employee';
  getEmployee(): Observable<Emp[]> {
    return this.http.get<Emp[]>(`${this.apiUrl}`);
  }
  createEmployee(emp: Emp): Observable<Emp> {
    return this.http.post<Emp>(this.apiUrl, emp);
  }
  updateEmployee(id: string, emp: Emp) {
    return this.http.put(`${this.apiUrl}/${id}`, emp);
  }
  deleteEmployee(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
// employee.ts
// getEmployeeById(id: string): Observable<Emp> {
//   return this.http.get<Emp>(`${this.apiUrl}/${id}`);
// }

}
