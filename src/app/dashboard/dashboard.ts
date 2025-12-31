import { Component } from '@angular/core';
import { StudentService } from '../apis/student-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
// studentcount = 0;
//   teachercount=0;
//   constructor(private sservice:StudentService, private tservice: Te) {
//     // this.studentcount = this.sservice.getstudentcount(); 
//     // this.teachercount=this.tservice.getteachercount();
//   }
}
