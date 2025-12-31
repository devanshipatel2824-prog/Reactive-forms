import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../student/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  students: Student[] = [];
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // ✅ FIXED UPDATE
  update(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
