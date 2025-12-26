import { Routes } from '@angular/router';
import { Form } from './form/form';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: 'form',
        component: Form
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home)
    }

];
