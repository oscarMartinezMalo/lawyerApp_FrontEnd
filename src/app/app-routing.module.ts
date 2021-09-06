import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CaseFormComponent } from './lawyer/components/case-form/case-form.component';
import { CaseListComponent } from './lawyer/components/case-list/case-list.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';


const routes: Routes = [
  { path: "new-case", component: CaseFormComponent},
  { path: "case-list", component: CaseListComponent},
  { path: 'not_found', component: ErrorPageComponent, data: { message: 'This page can’t be reached'} },
  { path: '**', redirectTo: '/not_found' }
];

@NgModule({
  imports: [    
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
