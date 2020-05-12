import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalUrlRedirectorComponent } from '@widget/components';

const routes: Routes = [
  {
    path: 'external-redirect',
    component: ExternalUrlRedirectorComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('@feature/modules/main.module').then(
        (module) => module.MainModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
