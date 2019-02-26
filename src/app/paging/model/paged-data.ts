/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import {Page} from "./page";

/**
 * 	用于分页的具有关联页对象的数据数组
 *	An array of data with an associated page object used for paging
 *
 * @author 刘宏强
 */
export class PagedData<T> {

	// 分页
    page = new Page();

	// 数据
    data = new Array<T>();

}
