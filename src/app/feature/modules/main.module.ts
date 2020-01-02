import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent,
  NavbarComponent,
  FooterComponent,
} from '@feature/components';
import { HomePageComponent } from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: '', component: HomePageComponent }],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
  exports: [],
  providers: [],
})
export class MainModule {}
