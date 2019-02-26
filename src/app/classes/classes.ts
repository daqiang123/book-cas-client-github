import { Page } from './../paging/model/page';

/**
 * 	分类类
 *
 * @author 刘宏强
 */
export class Classes extends Page {

	/**
	 * 分类主键
	 */
	classesId: string;
	
	/**
	 * 分类名称
	 */
	classesName: string;
	
	/**
	 * 父分类
	 */
	classesParent: string;
	
	/**
	 * 创建时间
	 */
	classesCreateTime: string;
	
	/**
	 * 修改时间
	 */
	classesUpdateTime: string;
	
	/**
	 * 分类排序
	 */
	classesSort: number;
	
	
	/**
	 * 分类状态
	 */
	classesState: boolean;
	
}
