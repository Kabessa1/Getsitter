import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { UserProfile } from '../types';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: UserProfile | undefined;
 
  constructor(private http: HttpClient, private storageService: StorageService) { }

  ngOnInit(): void {
    this.http.get<UserProfile>(`/api/user-profile/${this.storageService.getUser().id}`)
    .subscribe((profile: UserProfile) => {
      this.profile = profile;
    });
  }
}
