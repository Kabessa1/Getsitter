import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListComponent } from '../list/list.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private dialog: MatDialog) { }
 


  openLoginPopup(): void {
    const dialogRef = this.dialog.open(LoginComponent,)
  }

  openRegisterPopup(): void {
    const dialogRef = this.dialog.open(RegisterComponent,  {
      width: '60%'
    })

  }

  
}
