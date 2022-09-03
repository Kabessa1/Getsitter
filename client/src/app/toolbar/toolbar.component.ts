import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { UserProfile } from '../types';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  // profile: UserProfile | undefined;
  // imageSrc = 'assets/images/logo.png'  
  // imageAlt = 'logo'
  isUserLogged$ = this.storageService.isLoggedIn$;
  constructor(private router : Router, private storageService: StorageService) {}
  goTopage(pageName:string):void {
  this.router.navigate([pageName]);
  }
  goTo(pageName:string):void {
    this.router.navigate([pageName]);
    }
    goTo2(pageName:string):void {
      this.router.navigate([pageName]);
      }

  ngOnInit(): void {
  }

}
