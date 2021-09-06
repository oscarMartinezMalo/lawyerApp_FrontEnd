import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModulesModule} from './material-modules.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CaseListComponent } from './lawyer/components/case-list/case-list.component';
import { CaseFormComponent } from './lawyer/components/case-form/case-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseFormComponent,
    CaseListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModulesModule,
    
    CoreModule,
    SharedModule,    
    AuthModule,    
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
