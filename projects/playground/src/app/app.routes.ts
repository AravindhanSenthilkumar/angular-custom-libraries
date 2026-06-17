import { Routes } from '@angular/router';
import { FormTest } from './form-test/form-test';
import { TableTest } from './table-test/table-test';
import { WizardTest } from './wizard-test/wizard-test';
import { ModalTest } from './modal-test/modal-test';
import { AlertTest } from './alert-test/alert-test';
import { SnackbarTest } from './snackbar-test/snackbar-test';
import { ConfigTest } from './config-test/config-test';

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
        path:'snackbar',
        component:SnackbarTest
    },
    {
        path:'config',
        component:ConfigTest
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
