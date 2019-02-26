/*
 * Copyright (c) 2019. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BookClasses } from './bookClasses';
import { HttpErrorHandler, HandleError } from './../http-error-handler.service';

import { Page } from './../paging/model/page';

import { environment } from './../../environments/environment';

import { MessageService } from './../message.service';
import {Book} from "../book/book";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

/**
 * 	图书分类服务
 *
 * @author 刘宏强
 */
@Injectable()
export class BookClassesService {

  bookClasses: BookClasses;
  
  bookClassesUrl = environment.server + 'bookClasses';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('BookClassesService');
    this.bookClasses = new BookClasses();
  }

  /**
   *	查询所有图书分类
   */
  getAll (page: Page, bookClasses: BookClasses): Observable<any> {
  	bookClasses.pageNumber = page.pageNumber;
    bookClasses.size = page.size; 
    return this.http.post<any>(this.bookClassesUrl + '/findAll', bookClasses)
      .pipe(
        catchError(this.handleError('getBookClassess', []))
      );
  }

  /**
   *	查询所有已授权菜单
   */
  getAllRelationClasses (book: Book): Observable<any> {
    return this.http.post<Book>(this.bookClassesUrl + '/findAllRelationClasses', book)
      .pipe(
        catchError(this.handleError('getAllRelationClasses', book))
      );
  }

  /**
   * 
   * @param bookId 获取到相关图书
   */
  getRelatedBooks(bookId:String):Observable<Book[]>{

    const url = `${this.bookClassesUrl}/findRelatedBooks/${bookId}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => this.log(`fetched books id=${bookId}`)),
      catchError(this.handleError<Book[]>(`getOne id=${bookId}`))
    );
    
  }

  /**
   * 	保存图书分类
   */
  add (bookClasses: BookClasses): Observable<BookClasses> {
    
    return this.http.post<BookClasses>(this.bookClassesUrl + '/save', bookClasses)
      .pipe(
        catchError(this.handleError('addBookClasses', bookClasses))
      );
  }

  /**
   *	保存图书分类
   */
  saveBookClasses (bookClasseses: BookClasses[]): Observable<any> {
    return this.http.post<BookClasses>(this.bookClassesUrl + '/saveBookClasses', bookClasseses)
      .pipe(
        catchError(this.handleError('saveBookClasses', bookClasseses))
      );
  }
  
  /**
   *	根据主键查询图书分类
   */
  getOne(id: string): Observable<any> {
    const url = `${this.bookClassesUrl}/${id}`;
    return this.http.get<BookClasses>(url).pipe(
      tap(_ => this.log(`fetched bookClasses id=${id}`)),
      catchError(this.handleError<BookClasses>(`getOne id=${id}`))
    );
  }

  /**
   *	修改图书分类
   */
  update (bookClasses: BookClasses): Observable<BookClasses> {
    return this.http.put<BookClasses>(this.bookClassesUrl + '/update', bookClasses)
      .pipe(
        catchError(this.handleError('updateBookClasses', bookClasses))
      );
  }
  
  /**
   *	删除图书分类
   */
  delete (id: string): Observable<{}> {
    const url = `${this.bookClassesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteBookClasses'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('BookClassesService: ' + message);
  }
  
}
