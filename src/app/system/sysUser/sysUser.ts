/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */

import { Page } from './../../paging/model/page';

//import { SysRoleUser } from './../sysRoleUser/sysRoleUser';

/**
 * 	用户类
 *
 * @author 刘宏强
 */
export class SysUser extends Page {
	
	/**
	 * 	用户主键
	 */
	id: string;

	/**
	 * 	用户名
	 */
	username: string;

	/**
	 * 	旧密码
	 */
	oldPassword: string;
	
	/**
	 * 	密码
	 */
	password: string;
	
	/**
	 * 	确认密码
	 */
	confirmPassword: string;

	/**
	 * 	中文名
	 */
	chineseName: string;

	/**
	 * 	手机号
	 */
	phone: string;

	/**
	 * 	电子邮件
	 */
	email: string;

	/**
	 * 	头像
	 */
	avatar: string;

	/**
	 * 	排序
	 */
	sort: number;

	/**
	 * 	状态
	 */
	state: boolean;

	/**
	 * 	备注
	 */
	remark: string;
	
	/**
	 * 	所属角色
	 */
	roleId: string;
	
	/**
	 *	角色用户
	 */
	//sysRoleUsers: SysRoleUser[];

}
