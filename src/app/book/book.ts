import { Page } from './../paging/model/page';

/**
 * 	图书类
 *
 * @author 刘宏强
 */
export class Book extends Page {
	
	/**
	 * 图书主键
	 */
	bookId: string;

	/**
	 * 图书名称
	 */
	bookName: string;
	
	/**
	 * 图书标题
	 */
	bookTitle: string;

  /**
   * 图书编号
   */
  bookNo: string;

  /**
   * 图书语种
   */
  bookLanguage: string;

  /**
   * 外文名称
   */
  foreignName: string;
	
	/**
	 * 图书作者
	 */
	bookAuthor: string;

	/**
	 * 作者简介
	 */
	bookAuthorSummary: string;

	/**
	 * 图书译者
	 */
	bookTranslator: string;

	/**
	 * 译者简介
	 */
	bookTranslatorSummary: string;

	/**
	 * 图书目录
	 */
	bookCatalog: string;

	/**
	 * 内容简介
	 */
	bookContentSummary: string;

  /**
   * 精彩书摘
   */
  bookWonderfulDigest: string;

  /**
   * 前言/序言
   */
  bookPreface: string;

	/**
	 * 出版国家
	 */
	bookPublishCountry: string;

	/**
	 * 出版社
	 */
	bookPress: string;

	/**
	 * 出版日期
	 */
	bookPublishDate: string;

  /**
   * 图书版次
   */
  bookEditionOrder: string;

  /**
   * 图书页数
   */
  bookPages: number;

  /**
   * 图书定价
   */
  bookPrice: number;

	/**
	 * 图书封面
	 */
	bookCover: string;
	
	/**
	 * 图书封面
	 */
	bookCoverUuid: string;
	
	/**
	 * 图书封面
	 */
	bookCoverSuffix: string;

	/**
	 * 优先级
	 */
	bookPriority: string;

	/**
	 * 创建时间
	 */
	bookCreateTime: string;

	/**
	 * 修改时间
	 */
	bookUpdateTime: string;

	/**
	 * 图书排序
	 */
	bookSort: number;

	/**
	 * 图书状态
	 */
	bookState: boolean;

  /**
   * 是否有解读视频
   */
  haveUnscramble: boolean;

}
