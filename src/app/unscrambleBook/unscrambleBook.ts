import { Page } from './../paging/model/page';

/**
 * 	解读图书类
 *
 * @author 刘宏强
 */
export class UnscrambleBook extends Page {
	
	/**
	 * 解读图书主键
	 */
	unscrambleBookId: string;

	/**
	 * 图书
	 */
	bookId: string;

	/**
	 * 解读人主键
	 */
	unscrambleId: string;

	/**
	 * 视频
	 */
	videoId: string;
	
	/**
	 * 解读图书排序
	 */
	unscrambleBookSort: number;

	/**
	 * 解读图书状态
	 */
	unscrambleBookState: boolean;

}
