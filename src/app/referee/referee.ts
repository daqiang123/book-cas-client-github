import { Page } from './../paging/model/page';

/**
 * 	推荐人类
 *
 * @author 刘宏强
 */
export class Referee extends Page {
	
	/**
	 * 推荐人主键
	 */
	refereeId: string;
	
	/**
	 * 推荐人姓名
	 */
	refereeName: string;
	
	/**
	 * 推荐人简介
	 */
	refereeSummary: string;
	
	/**
	 * 推荐人排序
	 */
	refereeSort: number;
	
	/**
	 * 推荐人状态
	 */
	refereeState: boolean;
	
	imagePath: string;

	imageSuffix: string;

}
