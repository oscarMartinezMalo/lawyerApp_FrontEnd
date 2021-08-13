import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModulesModule } from '../material-modules.module';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModulesModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
    ]
    )
  ],    
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
