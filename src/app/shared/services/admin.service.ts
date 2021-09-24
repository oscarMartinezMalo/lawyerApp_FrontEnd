import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { take, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AppError } from "../errors/app-error";
import { UserExitsError } from "../errors/user-exits-error";
import { Case } from "../models/case.model";

interface Role {
    id: string,
    name: string,
  }

@Injectable({
    providedIn: 'root'
  })
  export class AdminService {
    readonly BASE_URL = `${environment.baseUrl}api/account/roles`;
  
    constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar
      ) { }


      async getRoleList(): Promise<Role[]>{
        let roles = await this.http.get(this.BASE_URL).
         pipe(take(1),
           catchError((error: Response) => {
             if(error.status === 400) {
               return throwError(new UserExitsError(error));
             }
             return throwError(new AppError(error));
           })).toPromise();
   
           return roles as Role[];
       }
}  