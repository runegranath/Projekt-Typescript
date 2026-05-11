import { Routes } from '@angular/router';
import { Kurser } from './components/kurser/kurser';
import { Ramschema } from './components/ramschema/ramschema';

export const routes: Routes = [
    { path: 'kurser', component: Kurser },
    { path: 'ramschema', component: Ramschema },
    { path: '', redirectTo: '/kurser', pathMatch: 'full' },
    { path: '**', redirectTo: '/kurser'}
];
