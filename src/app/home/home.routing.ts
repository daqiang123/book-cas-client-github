/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import { Routes } from '@angular/router';

// 看图书
import { HomeComponent } from './home.component';
// 图书详情
import { DetailComponent } from './detail.component';

/**
 * 	看图书导航组件
 *
 * @author 刘宏强
 */
export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: '',
      component: HomeComponent,
      data: {
        title: '看图书',
        urls: [{title: '看图书', url: '/home'}, {title: '看图书'}]
      }
    },
    {
      path: 'detail/:id',
      component: DetailComponent,
      data: {
        title: '图书详情',
        urls: [{title: '图书详情', url: '/detial'}, {title: '图书详情'}]
      }
    }
    ]
  }
];
