import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(
    private snackBar: MatSnackBar,
    ) { }

  displayError() {
    this.openPopUp();
  }

  async openPopUp() {
    this.snackBar.open(`To Access, please Login!!!`, 'X', { duration: 20000, panelClass: ['red-snackbar'] });
  }
}
