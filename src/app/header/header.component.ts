/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import { Component, OnInit } from '@angular/core';

// 用户
import { SysUserService } from './../system/sysUser/sysUser.service';

/**
 * 	页头组件
 *
 * @author 刘宏强
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // 当前登录用户
  currentUser: string; 
  
  constructor(private sysUserService: SysUserService) {
	//navigation	
	(<any>$('.navigation')).onePageNav({
		scrollOffset: 0
	});
  }

  ngOnInit() {
  	this.getCurrentUser();
  }
  
  /**
   *	获取当前登录用户
   */
  getCurrentUser() {
  	debugger
      this.sysUserService.getCurrentUser().subscribe(data => {
      	if ('4001' == data.code) {
      		this.currentUser = data.data;
      	} else {
      		this.currentUser = null;
      	}
      });
  }

}
