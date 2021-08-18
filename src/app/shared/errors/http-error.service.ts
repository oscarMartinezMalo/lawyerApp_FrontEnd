import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(
    ) { }

  displayError() {
    this.openPopUp();
  }

  async openPopUp() {
    // const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.title = 'Warning';
    // modalRef.componentInstance.message = 'To Access, please Login!!';
  }
}
