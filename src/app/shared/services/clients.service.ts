import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { take, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppError } from '../errors/app-error';
import { UserExitsError } from '../errors/user-exits-error';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  readonly BASE_URL = `${environment.baseUrl}api/clients/getClientsByQuery`;
  opts= [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }


  getClientsByQueryObservable(clientNameQuery: string): Observable<Client[]>{
    const params = new HttpParams({fromString: `query=${clientNameQuery}`});
    return this.http.get(this.BASE_URL, { params }) as Observable<Client[]>;
  }
}
