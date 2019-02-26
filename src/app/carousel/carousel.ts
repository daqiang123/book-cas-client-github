import { Page } from './../paging/model/page';

/**
 * 	轮播图类
 *
 * @author 刘宏强
 */
export class Carousel extends Page {
	
	/**
	 * 轮播图主键
	 */
	carouselId: string;

  /**
   * 关联图书
   */
  bookId: string;
	
	/**
	 * 轮播图名称
	 */
	carouselName: string;
	
	/**
	 * 轮播图标题
	 */
	carouselTitle: string;
	
	/**
	 * 轮播图描述
	 */
	carouselDesc: string;
	
	/**
	 * 图片
	 */
	picture: string;
	
	/**
	 * 图片主键
	 */
	pictureUuid: string;
	
	/**
	 * 图片后缀
	 */
	pictureSuffix: string;
	
	/**
	 * 链接模块
	 */
	linkModule: string;
	
	/**
	 * 轮播图排序
	 */
	carouselSort: number;
	
	/**
	 * 轮播图状态
	 */
	carouselState: boolean;
	
	imagePath: string;

	imageSuffix: string;

}
