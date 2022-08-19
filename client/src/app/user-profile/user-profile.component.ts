import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('/api/users-profile').subscribe((data: any[])=>{this.profile=data[0]});
    this.http.get<any>('/api/user-profile/3').subscribe((data: any)=>{this.profile=data});   
  }
}
