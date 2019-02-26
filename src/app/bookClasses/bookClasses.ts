import { Page } from './../paging/model/page';
import {Book} from "../book/book";
import {Classes} from "../classes/classes";

/**
 * 	图书分类类
 *
 * @author 刘宏强
 */
export class BookClasses extends Page {

  /**
   * 图书分类主键
   */
  bookClassesId: string;

  /**
   * 图书
   */
  book: Book;

  /**
   * 分类
   */
  classes: Classes;

}
