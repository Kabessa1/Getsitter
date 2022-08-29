import { take } from 'rxjs';
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
    .pipe(take(1))
    .subscribe((profile: UserProfile) => {
      this.profile = profile;
    });
  }

  updateMyProfile(): void {
    this.http.put(`/api/user-profile/${this.storageService.getUser().id}`, {
      "id": 1,
      "firstname": "noa",
      "lastname": "kabesa",
      "email": "a@b.c",
      "homeaddress": null,
      "type": "SITTER",
      "city": null,
      "age": null,
      "phonenumber": null,
      "imgurl": null,
      "about": "I am noa"
  }).pipe(take(1)).subscribe();
  }
}
