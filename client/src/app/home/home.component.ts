import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Observable, Subject, take } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isUserLogged$ = this.storageService.isLoggedIn$;
  constructor(private dialog: MatDialog, private storageService: StorageService) { 
  }
 

  openLoginPopup(): void {
    const dialogRef = this.dialog.open(LoginComponent,)
  }

  openRegisterPopup(): void {
    const dialogRef = this.dialog.open(RegisterComponent,  {
      width: '60%'
    })

  }

  logout(): void {
    this.storageService.clean();
  }
}
