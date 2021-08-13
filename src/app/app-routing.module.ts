import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';


const routes: Routes = [
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
