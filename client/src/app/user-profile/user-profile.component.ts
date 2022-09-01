import { Observable, observable, take, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, } from '@angular/forms';
import { StorageService } from '../storage.service';
import { UserProfile } from '../types';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  profile: UserProfile | undefined;
  constructor(private http: HttpClient, private storageService: StorageService, private FormBuilder: FormBuilder, private ref: ChangeDetectorRef) { }
    ngOnInit(): void {
      this.getuserprofile().subscribe((profile: UserProfile) => {
          this.profile = profile;
          this.ref.detectChanges();
          console.log(this.profile);
          
        });
    // this.http.get<UserProfile>(`/api/user-profile/${this.storageService.getUser().id}`)
    // .pipe(take(1))
    // .subscribe((profile: UserProfile) => {
    //   this.profile = profile;
    // });
  }
  getuserprofile():Observable<UserProfile> {
      return this.http.get<UserProfile>(`/api/user-profile/${this.storageService.getUser().id}`)
      .pipe(take(1));
  }

  userprofileForm = this.FormBuilder.group({
    id: [''],
    firstname: [''],
    lastname: [''],
    email: [''],
    homeaddress: [''],
    type:[''],
    city:[''],
    age:[''],
    phonenumber:[''],
    imgurl:[''],
    about:[''],
  })

  get id(): FormControl {
    return this.userprofileForm.get('id') as FormControl;
  } 

  get firstname(): FormControl {
    return this.userprofileForm.get('firstname') as FormControl;
  } 
  get lastname(): FormControl {
    return this.userprofileForm.get('lastname') as FormControl;
  } 
  get email(): FormControl {
    return this.userprofileForm.get('email') as FormControl;
  } 
  get homeaddress(): FormControl {
    return this.userprofileForm.get('homeaddress') as FormControl;
  } 
  get type(): FormControl {
    return this.userprofileForm.get('type') as FormControl;
  } 
  get city(): FormControl {
    return this.userprofileForm.get('city') as FormControl;
  } 
  get age(): FormControl {
    return this.userprofileForm.get('age') as FormControl;
  } 
  get phonenumber(): FormControl {
    return this.userprofileForm.get('phonenumber') as FormControl;
  } 
  get imgurl(): FormControl {
    return this.userprofileForm.get('imgurl') as FormControl;
  } 
  get about(): FormControl {
    return this.userprofileForm.get('about') as FormControl;
  } 
  
  updateMyProfile(): void {
    this.http.put(`/api/user-profile/${this.storageService.getUser().id}`, {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      homeaddress: this.homeaddress.value,
      type: this.type.value,
      city: this.city.value,
      age: this.age.value,
      phonenumber: this.phonenumber.value,
      imgurl: this.imgurl.value,
      about: this.about.value,
  }).pipe(take(1)).subscribe(() => {
    this.profile = this.userprofileForm.value;
  });
  }
}
// }).pipe(take(1),switchMap(() => this.getuserprofile())).subscribe((profile: UserProfile) => {
//   this.profile = profile;