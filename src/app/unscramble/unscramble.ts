import { Page } from './../paging/model/page';

/**
 * 	解读人类
 *
 * @author 刘宏强
 */
export class Unscramble extends Page {
	
	/**
	 * 解读人主键
	 */
	unscrambleId: string;
	
	/**
	 * 解读人姓名
	 */
	unscrambleName: string;
	
	/**
	 * 解读人职称
	 */
	unscrambleTitle: string;
	
	/**
	 * 解读人简介
	 */
	unscrambleSummary: string;
	
	/**
	 * 解读人排序
	 */
	unscrambleSort: number;
	
	/**
	 * 解读人状态
	 */
	unscrambleState: boolean;
	
	imagePath: string;

	imageSuffix: string;

}
