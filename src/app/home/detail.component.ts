import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import {NavigationEnd, Router} from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// 分类
import { Classes } from './../classes/classes';
import { ClassesService } from './../classes/classes.service';
// 图书
import { Book } from './../book/book';
import { BookService } from './../book/book.service';
// 解读人
import { Unscramble } from './../unscramble/unscramble';
import { UnscrambleService } from './../unscramble/unscramble.service';
// 解读图书
import { UnscrambleBook } from './../unscrambleBook/unscrambleBook';
import { UnscrambleBookService } from './../unscrambleBook/unscrambleBook.service';

import { environment } from './../../environments/environment';

declare var require: any;

declare var WOW: any;

/**
 * 	图书详情组件
 *
 * @author 刘宏强
 */
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit, OnDestroy, AfterViewInit {

	// 装载指示器
  loadingIndicator: boolean = true;

  // 可重新排序的
  reorderable: boolean = true;

  // 主键
	id: string; 
	
	// 分类列表
	classes = new Array<Classes>();
    
	// 订单类
	book: Book;
	
	// 服务端IP地址和端口
	server: string;
	  
  // 解读人数组
  unscrambles: Unscramble[];

  // 解读图书数组
  unscrambleBookes: UnscrambleBook[];

  // 图书URL
  bookUrl = environment.server + 'book';

  // 折叠切换
  toggle: boolean;

  navigationSubscription;

  /**
	 *	构造函数
	 */
    constructor(
    	private router: Router, 
    	private route: ActivatedRoute, 
    	vcr: ViewContainerRef, 
    	private modalService: NgbModal,
    	private classesService: ClassesService, 
    	private bookService: BookService,
    	private unscrambleService: UnscrambleService,
    	private unscrambleBookService: UnscrambleBookService) {
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
        route.params.subscribe(params => {this.id = params['id'];});
        this.book = new Book();
        this.book.bookId = this.id;
	    	this.server = environment.server; 
	    	this.unscrambles = [];    
	    	this.unscrambleBookes = [];
        // 折叠切换
        this.toggle = true;

        this.navigationSubscription = this.router.events.subscribe((event: any) => {
          if (event instanceof NavigationEnd) {
            // 获取所有分类
            this.getAllClasses();

            // 设置图书
            this.setBook();
          }
        });
	    	
    }
    
    /**
     *	初始化方法
     */
    ngOnInit() {
    
    	// 获取所有分类
    	this.getAllClasses();
    	
    	// 设置图书
    	this.setBook();
    	
	}
	
	/**
	 *	查询所有分类
	 */
	getAllClasses() {
	    this.classesService.getAllClasses().subscribe(data => {
	        this.classes = data;
	    });
	}
  	
	/**
	 *	设置图书
	 */
	setBook(){
		
	    if (this.id != '0') {
	      this.bookService.getOne(this.id).subscribe(data => {
	        if ('4001' == data.code) {
	      		this.book = data.data;
            // 作者简介
            $('#bookAuthorSummary').html(this.book.bookAuthorSummary);
            // 译者简介
            $('#bookTranslatorSummary').html(this.book.bookTranslatorSummary);
            // 图书目录
            $('#bookCatalog').html(this.book.bookCatalog);
            // 内容简介
            $('#bookContentSummary').html(this.book.bookContentSummary);
            // 精彩书摘
            $('#bookWonderfulDigest').html(this.book.bookWonderfulDigest);
            // 前言/序言
            $('#bookPreface').html(this.book.bookPreface);
	      		// 获取所有解读人
    			this.getAllUnscrambleBookesByBook();
	      	}
	      });
	    } else {
	      this.book = new Book();
	    }
    }
  
	/**
	 *	视图初始化方法
	 */
	ngAfterViewInit(){}
	
	/**
     *	获取所有图书解读信息
     */
	getAllUnscrambleBookesByBook() {
	    this.unscrambleBookService.getAllUnscrambleBookesByBook(this.book).subscribe(data => {
	        this.unscrambleBookes = data;
	    });
	}
	
	/**
	 *	保存图书
	 */
	save() {
    
		if (this.book.bookId != null) {
	      this.bookService.update(this.book).subscribe(data => {
	  	  });
	    } else {
	      this.bookService.add(this.book).subscribe(data => {
	  	  });
	    }
	}

  /**
   *  折叠切换
   */
  changeToggle() {
    debugger
    this.toggle = !this.toggle;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
	
}
