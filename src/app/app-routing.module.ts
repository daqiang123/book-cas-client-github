/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

/**
 * 	应用导航组件
 *
 *	@author 刘宏强
 */
export const routes: Routes = [
{
    path: '',
    component: FullComponent,
    children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', loadChildren: './home/home.module#HomeModule' },

    ]
},
{
    path: '**',
    redirectTo: 'home'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', enableTracing: false}), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }
