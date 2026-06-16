import { Routes } from '@angular/router';
import { FormTest } from './form-test/form-test';
import { TableTest } from './table-test/table-test';
import { WizardTest } from './wizard-test/wizard-test';
import { ModalTest } from './modal-test/modal-test';
import { AlertTest } from './alert-test/alert-test';
import { ToastTest } from './toast-test/toast-test';

export const routes: Routes = [
     {
        path:'form',
        component: FormTest
    },
    {
        path:'wizard',
        component: WizardTest
    },
    {
        path:'table',
        component:TableTest
    },
    {
        path:'modal',
        component:ModalTest
    },
    {
        path:'alert',
        component:AlertTest
    },
    {
        path:'toast',
        component:ToastTest
    },
    {
        path:'',
        redirectTo:'form',
        pathMatch:'full'
    },
    {
        path:'**',
        redirectTo:'form',
        pathMatch:'full'
    }
];
