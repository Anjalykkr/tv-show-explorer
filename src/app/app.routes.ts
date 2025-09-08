import { Routes } from '@angular/router';
import { ShowList } from './show-list/show-list';
import { ShowDetail } from './show-detail/show-detail';

export const routes: Routes = [{ path: '', component: ShowList },
  { path: 'show/:id', component: ShowDetail }];
