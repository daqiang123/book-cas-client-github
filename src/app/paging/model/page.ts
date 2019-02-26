/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
/**
 * 	用于从服务器获取页面信息的对象
 *	An object used to get page information from the server
 *
 * @author 刘宏强
 */
export class Page {

    // 当前页码
    // The current page number
    pageNumber: number = 0;

    // 页面中的元素数量
    // The number of elements in the page
    size: number = 0;

    // 元素总数
    // The total number of elements
    totalElements: number = 0;

    // 页面总数
    // The total number of pages
    totalPages: number = 0;

}
