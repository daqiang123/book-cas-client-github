/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

/**
 * 	完整布局组件
 *
 * @author 刘宏强
 */
@Component({
    selector: 'full-layout',
    templateUrl: './full.component.html',
    styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

    color = 'blue';
    showSettings = false;
    showMinisidebar = false;
    showDarktheme = false;

	public config: PerfectScrollbarConfigInterface = {};

    constructor(public router: Router) {

    }

    ngOnInit() {
        if (this.router.url === '/') {
            // this.router.navigate(['/dashboard/dashboard1']);
            this.router.navigate(['/home']);
        }
    }

}
