import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent,
  NavbarComponent,
  FooterComponent,
} from '@feature/components';
import { WidgetModule } from '@widget/widget.module';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [MainComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
  exports: [],
  providers: [],
})
export class MainModule {}
