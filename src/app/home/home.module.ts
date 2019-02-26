/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

// 看图书
import {HomeComponent} from './home.component';
// 图书详情
import {DetailComponent} from './detail.component';
import {HomeRoutes} from './home.routing';
// 分类服务
import {ClassesService} from './../classes/classes.service';
// 图书分类服务
import {BookClassesService} from './../bookClasses/bookClasses.service';
// 图书服务
import {BookService} from './../book/book.service';
// 轮播图服务
import {CarouselService} from './../carousel/carousel.service';
// 图片
import {SysImageService} from './../system/sysImage/sysImage.service';
// 推荐人
import {RefereeService} from './../referee/referee.service';
// 推荐图书
import {RefereeBookService} from './../refereeBook/refereeBook.service';
// 解读人
import {UnscrambleService} from './../unscramble/unscramble.service';
// 解读图书
import {UnscrambleBookService} from './../unscrambleBook/unscrambleBook.service';
// 分页
import {PaginationComponent} from "./../paging/custom-pagination";
//评论

import {MomentAgoPipe} from './../moment-ago.pipe';
import {CommentService} from './../comment/comment.service';
import {CommentComponent} from './../comment/comment.component';
import {CommentListComponent} from './../comment/comment-list/comment-list.component';
import {CommentFormComponent} from './../comment/comment-form/comment-form.component';
import { BookRelatedComponent } from './../book-related/book-related.component';

/**
 *  看图书模块
 *
 * @author 刘宏强
 */
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeComponent,
    DetailComponent,
	PaginationComponent,	
    MomentAgoPipe,
    CommentComponent,
    CommentListComponent,
    CommentFormComponent,
    BookRelatedComponent
  ],
  providers: [
    ClassesService,
    BookClassesService,
    BookService,
    CarouselService,
    SysImageService,
    RefereeService,
    RefereeBookService,
    UnscrambleService,
    UnscrambleBookService,
    CommentService
  ]
})
export class HomeModule {
}
