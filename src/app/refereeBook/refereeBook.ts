import { Page } from './../paging/model/page';
import {Referee} from "../referee/referee";

/**
 * 	推荐图书类
 *
 * @author 刘宏强
 */
export class RefereeBook extends Page {
	
	/**
	 * 推荐图书主键
	 */
	refereeBookId: string;
	
	/**
	 * 图书
	 */
	bookId: string;

	/**
	 * 推荐图书主键
	 */
	refereeId: string;

  /**
   * 推荐人
   */
  referee: Referee;
	
	/**
	 * 推荐图书排序
	 */
	refereeBookSort: number;

	/**
	 * 推荐图书状态
	 */
	refereeBookState: boolean;

}
