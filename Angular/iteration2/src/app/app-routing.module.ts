import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { RequestComponent } from './request/request.component';
import { OfferComponent } from './offers/offers.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const schoolsModule = () => import('./schools/schools.module').then(x => x.SchoolsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'schools', loadChildren: schoolsModule, canActivate: [AuthGuard], data: { roles: [Role.SuperAdmin] } },
    { path: 'account', loadChildren: accountModule },
    { path: 'requests', component: RequestComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }  },
    { path: 'offers', component: OfferComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // otherwise redirect to home
    { path: '**', redirectTo: '/offers' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }