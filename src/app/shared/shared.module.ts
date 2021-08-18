import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AppErrorHandler } from './errors/app-error-handler';
// import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ErrorPageComponent
  ],
  providers: [
    // AuthGuard,
    AuthService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ]
})
export class SharedModule { }


