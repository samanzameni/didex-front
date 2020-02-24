import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@feature/modules/main.module').then(module => module.MainModule),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('@feature/modules/auth.module').then(module => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
