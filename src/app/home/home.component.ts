import { Component, OnInit } from '@angular/core';

import { Page } from './../paging/model/page';

// 分类
import { Classes } from './../classes/classes';
import { ClassesService } from './../classes/classes.service';
// 图书
import { Book } from './../book/book';
import { BookService } from './../book/book.service';
// 图书分类
import {BookClasses} from "../bookClasses/bookClasses";
import { BookClassesService } from './../bookClasses/bookClasses.service';
// 轮播图
import { Carousel } from './../carousel/carousel';
import { CarouselService } from './../carousel/carousel.service';
// 图片
import { SysImage } from './../system/sysImage/sysImage';
import { SysImageService } from './../system/sysImage/sysImage.service';
// 推荐人
import { Referee } from './../referee/referee';
import { RefereeService } from './../referee/referee.service';
// 推荐图书
import { RefereeBook } from './../refereeBook/refereeBook';
import { RefereeBookService } from './../refereeBook/refereeBook.service';
// 解读图书服务
import {UnscrambleBookService} from '../unscrambleBook/unscrambleBook.service';

import { environment } from './../../environments/environment';

declare var WOW: any;

/**
 * 	看图书组件
 *
 * @author 刘宏强
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // 装载指示器
  loadingIndicator: boolean = true;

  // 可重新排序的
  reorderable: boolean = true;

  // 行列表
  rows = new Array<Book>();

  // 页面对象
  page = new Page();

  // 当前第几页
  pageNumber: number;

  /**
   *	显示数组时显示的消息
   */
  messages = {

    // 不包含任何值
    emptyMessage: '没有数据显示',
		​
    // 页脚总条数
    totalMessage: '条'
  }

  // 轮播图列表
  carouseles = new Array<Carousel>();

  // 分类列表
  classesList = new Array<Classes>();

  // 分类主键
  classesId: string;

  // 分类
  classes: Classes;

  // 图书分类
  bookClasses: BookClasses;

  // 推荐人列表
  refereeList = new Array<Referee>();

  // 推荐人主键
  refereeId: string;

  // 推荐人
  referee: Referee;

  // 推荐图书
  refereeBook: RefereeBook;

  // 图书类
  book: Book;

  // 图片数组
  sysImages: SysImage[];

  // 推荐人数组
  referees: Referee[];

  // 推荐图书数组
  refereeBookes: RefereeBook[];

  // 服务端IP地址和端口
  server: string;

  // 选中分类数组
  selectedClasses1: boolean[];

  // 选中分类数组
  selectedClasses2: boolean[];

  // 选中推荐图书数组
  selectedReferee: boolean[];

  // 折叠切换
  toggle: boolean;

  /**
   *	构造函数
   */
  //@ViewChild(HomeComponent) table: HomeComponent;
  constructor(
    private classesService: ClassesService,
    private bookService: BookService,
    private carouselService: CarouselService,
    private sysImageService: SysImageService,
    private refereeService: RefereeService,
    private refereeBookService: RefereeBookService,
    private bookClassesService: BookClassesService,
    private unscrambleBookService: UnscrambleBookService) {
  	//setTimeout(() => { this.loadingIndicator = false; }, 500);

    $.getScript('../../assets/js/main.js');

    //animation
    new WOW().init();
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.book = new Book();
    this.sysImages = [];
    this.referees = [];
    this.refereeBookes = [];

    this.server = environment.server;

    this.classesId = '';
    this.classes = new Classes();
    this.bookClasses = new BookClasses();
    this.referee = new Referee();
    this.refereeBook = new RefereeBook();
    this.pageNumber = 0;
    // 折叠切换
    this.toggle = true;
  }

  /**
   *	初始化方法
   */
  ngOnInit() {

    // 获取所有图书分类
    this.getAllClasses();

    // 获取所有轮播图
    this.getAllCarouseles();

    // 获取所有推荐人
    this.getAllReferees();

    // 设置图书信息
  	this.setPage({ offset: 0 });

    $('.level_one').each(function(){
      if($(this).height() > $(this).find('.submenu').height() + 23){
      $(this).find('.submenu').height($(this).height());
      }
    });

    $('.sidemenu').find('div[father=1]').each(function(){
        var son_len=$(this).find('dl[son=1] dt:empty').length;
        var  sec_cate=$(this).find('.sec_cate:empty').length;
        if(sec_cate>0){$(this).find('.sec_cate').remove();}
        if(son_len>0){
            $(this).remove();
        }else{
            $(this).find('dl[son=1]').find('dt').wrapInner("<span></span>");
            $(this).find('dl[son=1]').find('dd').addClass('dd_level1');
        }
    });
    var fath_len=$('.sidemenu').find('div[father=1]').length-1;
    $('.sidemenu').find('div[father=1]').eq(fath_len).addClass('last');
    $('.eject_left').find('dd>a').each(function(){
        $(this).html("<span>"+$(this).html()+"</span>")
    });
    $('.eject_left').each(function(){
        var dl_len=$(this).find('dl').length-1;
        $(this).find('dl').eq(dl_len).addClass('last');
    });
    $(function(){
        $('.level_one').each(function(e){
            var submenu = $(this).find('.submenu');
            var dl_length=submenu.find('dl').length;
            submenu.hide();
             if(dl_length<1){
                $(this).find('.primary_dl dt span').css('background-image','none');
              }
            $(this).hover(function(){
                if(dl_length>0){
                   $(this).addClass('on');
                    $(this).find('.submenu').show();
                    var thisTop = -1;
                    var thisO = $(this), thisSub = thisO.find('.submenu'),thisBody = $('.flq_body');
                    var thisOOffsetT = parseFloat('800'),
                        thisOH = parseFloat('800'),
                        thisBodyOffsetT = parseFloat('800'),
                        thisSubH = parseFloat('800')

                    var winH = parseFloat('800'),
                        winScrollTop = parseFloat('800');

                    if(thisOOffsetT < winScrollTop){
                        thisTop = thisOOffsetT - thisBodyOffsetT - 2;
                    }else{
                        if(winScrollTop - thisBodyOffsetT > thisOOffsetT + thisOH - thisSubH - thisBodyOffsetT - 2){
                            thisTop = winScrollTop - thisBodyOffsetT
                        }else{
                            thisTop = thisOOffsetT + thisOH - thisSubH - thisBodyOffsetT - 2;
                            //isIe = 1;
                        }
                    }
                    if(thisTop < -1){
                        thisTop = -1;
                    }
                    thisSub.css({'top': thisTop + "px"})
                }
            },function(){
                $(this).removeClass('on');
                if(dl_length>0){
                    $(this).find('.submenu').hide();
                }
            });
        });
        $('.submenu').each(function(){
            var slen=$(this).find("dl").length;
            if(slen<1){$(this).remove;}
        });
    });
    var c_h = 1063-74-$('.sidemenu').height();

    $('.hotsell').find('.content').css({'height':c_h+'px','overflow':'hidden'});

    $('.level_one').each(function(){
      $(this).find('.primary_dl dd a').last().addClass('last_a');
    });

  }

  /**
   *	获取所有轮播图
   */
  getAllCarouseles() {

    this.carouselService.getAllCarouseles().subscribe(data => {
      this.carouseles = data;
    });
  }

  /**
   *	获取所有图书分类
   */
  getAllClasses() {
    this.classesService.getAllClasses().subscribe(data => {
        this.classesList = data;
        this.selectedClasses1 = [];
        this.selectedClasses2 = [];

        for(var i=0;i<this.classesList.length;i++){
          this.selectedClasses1[i] = false;
          this.selectedClasses2[i] = false;
        }
    });
  }

  /**
   *	获取所有推荐人
   */
  getAllReferees() {

    this.refereeService.getAllReferees().subscribe(data => {
      this.refereeList = data;
      this.selectedReferee = [];
      for(var i=0;i<this.refereeList.length;i++){
        this.selectedReferee[i] = false;
      }

    });
  }

  /**
   * 选中一级分类
   */
  onSelect1(classesIndex: number, classesId: string): void {
    this.classesId = classesId;
    this.searchClasses();
    //alert(classesId);
    for(var i=0;i<this.classesList.length;i++){
      this.selectedClasses2[i] = false;
    }
    for(var i=0;i<this.classesList.length;i++){
      if (classesIndex == i) {
        this.selectedClasses1[i] = true;
      } else {
        this.selectedClasses1[i] = false;
      }
    }

  }

  /**
   * 选中二级分类
   */
  onSelect2(classesIndex: number, classesId: string): void {
    this.classesId = classesId;
    this.searchClasses();
    //alert(classesId);
    for(var i=0;i<this.classesList.length;i++){
      this.selectedClasses1[i] = false;

      this.selectedClasses2[i] = false;
    }
    for(var i=0;i<this.classesList.length;i++){
      if (classesIndex == i) {
        this.selectedClasses2[i] = true;
      } else {
        this.selectedClasses2[i] = false;
      }
    }

  }

  /**
   * 选中推荐人
   */
  onSelectReferee(refereeIndex: number, refereeId: string): void {
    this.refereeId = refereeId;
    this.searchonReferee();
    //alert(classesId);
    for(var i=0;i<this.refereeList.length;i++){
      this.selectedReferee[i] = false;
    }
    for(var i=0;i<this.refereeList.length;i++){
      if (refereeIndex == i) {
        this.selectedReferee[i] = true;
      } else {
        this.selectedReferee[i] = false;
      }
    }

  }

  /**
   *  搜索
   */
  search() {
    this.setPage({ offset: 0 });
    // 清除选中分类
    for(var i=0;i<this.classesList.length;i++){
      this.selectedClasses1[i] = false;
      this.selectedClasses2[i] = false;
    }
    // 清除选中推荐人
    for(var i=0;i<this.refereeList.length;i++){
      this.selectedReferee[i] = false;
    }
  }

  /**
   *	根据分类搜索
   */
  searchClasses() {
    this.setPageClasses({ offset: 0 });
    // 清除选中推荐人
    for(var i=0;i<this.refereeList.length;i++){
      this.selectedReferee[i] = false;
    }
  }

  /**
   *  根据推荐人搜索
   */
  searchonReferee() {
    this.setPageReferee({ offset: 0 });
    // 清除选中分类
    for(var i=0;i<this.classesList.length;i++){
      this.selectedClasses1[i] = false;
      this.selectedClasses2[i] = false;
    }
  }

  /**
   *	重置
   */
  reset() {
    this.book = new Book();
    this.classes = new Classes();
    this.referee = new Referee();
  }

  /**
   *	根据页码填充新的数据表
   *	Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo){
    this.page = new Page();
    this.page.size = 16;
    this.page.pageNumber = pageInfo.offset;
    this.bookService.getAll(this.page, this.book).subscribe(pagedData => {
      if (pagedData.content != null) {
        this.page.totalElements =pagedData.totalElements;
        this.page.totalPages = pagedData.totalPages;
        this.rows = new Array<Book>();
        for(var i=0;i<pagedData.content.length;i++){
          let book = pagedData.content[i];
          this.rows.push(book);
        }
        this.unscrambleBookService.getAllUnscrambleBookesByBookes(this.rows).subscribe(data => {
            this.rows = data;
        });
      }
    });
  }

  /**
   *	根据分类、页码填充新的数据表
   *	Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPageClasses(pageInfo){
    if(this.classesId != '' && this.classesId != undefined) {
      this.classes.classesId = this.classesId;
      this.bookClasses.classes = this.classes;
    }
    this.page = new Page();
    this.page.size = 16;
    this.page.pageNumber = pageInfo.offset;
    this.bookClassesService.getAll(this.page, this.bookClasses).subscribe(pagedData => {
      if (pagedData.content != null) {
        this.page.totalElements =pagedData.totalElements;
        this.page.totalPages = pagedData.totalPages;
        this.rows = new Array<Book>();
        for(var i=0;i<pagedData.content.length;i++){
          let book = pagedData.content[i].book;
          this.rows.push(book);
        }
        this.unscrambleBookService.getAllUnscrambleBookesByBookes(this.rows).subscribe(data => {
          this.rows = data;
        });
      }
    });
  }

  /**
   *	根据推荐人、页码填充新的数据表
   *	Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPageReferee(pageInfo){
    if(this.refereeId != '' && this.refereeId != undefined) {
      this.referee.refereeId = this.refereeId;
      this.refereeBook.referee = this.referee;
    }
    this.page = new Page();
    this.page.size = 16;
    this.page.pageNumber = pageInfo.offset;
    this.refereeBookService.getAll(this.page, this.refereeBook).subscribe(pagedData => {
      if (pagedData.content != null) {
        this.page.totalElements =pagedData.totalElements;
        this.page.totalPages = pagedData.totalPages;
        this.rows = new Array<Book>();
        for(var i=0;i<pagedData.content.length;i++){
          let book = pagedData.content[i].book;
          this.rows.push(book);
        }
        this.unscrambleBookService.getAllUnscrambleBookesByBookes(this.rows).subscribe(data => {
          this.rows = data;
        });
      }
    });
  }

  /**
   * 翻页方法
   */
  changePage(event){
    this.page.pageNumber = this.pageNumber - 1;
    this.setPage({ offset: this.page.pageNumber });
  }

  /**
   *  折叠切换
   */
  changeToggle() {
      debugger
      this.toggle = !this.toggle;
  }

}
