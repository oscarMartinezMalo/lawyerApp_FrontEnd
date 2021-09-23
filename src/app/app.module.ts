import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModulesModule} from './material-modules.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CaseListComponent } from './lawyer/components/case-list/case-list.component';
import { CaseFormComponent } from './lawyer/components/case-form/case-form.component';
import { ClientsDropdownComponent } from './shared/components/clients-dropdown/clients-dropdown.component';
import { DialogCustomComponent } from './shared/components/dialog-custom/dialog-custom.component';
import { ClientFormComponent } from './lawyer/components/client-form/client-form.component';
import { ClientListComponent } from './lawyer/components/client-list/client-list.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    CaseFormComponent,
    CaseListComponent,
    ClientsDropdownComponent,
    DialogCustomComponent,
    ClientFormComponent,
    ClientListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModulesModule,
    
    CoreModule,
    SharedModule,    
    AuthModule,    
    AdminModule,
    AppRoutingModule,ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
