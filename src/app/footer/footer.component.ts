/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import { Component, OnInit } from '@angular/core';

/**
 * 	页尾组件
 *
 * @author 刘宏强
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: any;
  
  constructor() {
  	var date = new Date;
 	this.year = date.getFullYear(); 
  }

  ngOnInit() {
  }

}
