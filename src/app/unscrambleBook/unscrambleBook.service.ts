import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UnscrambleBook } from './unscrambleBook';
import { HttpErrorHandler, HandleError } from './../http-error-handler.service';

// 图书
import { Book } from './../book/book';

import { Page } from './../paging/model/page';

import { environment } from './../../environments/environment';

import { MessageService } from './../message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

/**
 * 	解读图书服务
 *
 * @author 刘宏强
 */
@Injectable()
export class UnscrambleBookService {

  unscrambleBook: UnscrambleBook;
  
  unscrambleBookUrl = environment.server + 'unscrambleBook';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('UnscrambleBookService');
  }

  /**
   *	查询所有解读图书
   */
  getAll (page: Page, unscrambleBook: UnscrambleBook): Observable<any> {
  	
  	unscrambleBook.pageNumber = page.pageNumber; 
    unscrambleBook.size = page.size; 
    return this.http.post<any>(this.unscrambleBookUrl + '/findAll', unscrambleBook)
      .pipe(
        catchError(this.handleError('getUnscrambleBooks', []))
      );
  }
  /**
   *	获取所有图书解读信息
   */
  getAllUnscrambleBookesByBook (book: Book): Observable<any> {
  	
    return this.http.post<any>(this.unscrambleBookUrl + '/findAllUnscrambleBookesByBook', book)
      .pipe(
        catchError(this.handleError('getAllUnscrambleBookesByBook', []))
      );
  }

  /**
   *	获取所有图书解读信息
   */
  getAllUnscrambleBookesByBookes (bookes: any): Observable<any> {

    return this.http.post<any>(this.unscrambleBookUrl + '/findAllUnscrambleBookesByBookes', bookes)
      .pipe(
        catchError(this.handleError('getAllUnscrambleBookesByBook', []))
      );
  }

  /**
   * 	保存解读图书
   */
  add (unscrambleBook: UnscrambleBook): Observable<UnscrambleBook> {
    
    return this.http.post<UnscrambleBook>(this.unscrambleBookUrl + '/save', unscrambleBook)
      .pipe(
        catchError(this.handleError('addUnscrambleBook', unscrambleBook))
      );
  }
  
  /**
   *	根据主键查询解读图书
   */
  getOne(id: string): Observable<any> {
    const url = `${this.unscrambleBookUrl}/${id}`;
    return this.http.get<UnscrambleBook>(url).pipe(
      tap(_ => this.log(`fetched unscrambleBook id=${id}`)),
      catchError(this.handleError<UnscrambleBook>(`getOne id=${id}`))
    );
  }

  /**
   *	修改解读图书
   */
  update (unscrambleBook: UnscrambleBook): Observable<UnscrambleBook> {
    return this.http.put<UnscrambleBook>(this.unscrambleBookUrl + '/update', unscrambleBook)
      .pipe(
        catchError(this.handleError('updateUnscrambleBook', unscrambleBook))
      );
  }
  
  /**
   *	删除解读图书
   */
  delete (id: string): Observable<{}> {
    const url = `${this.unscrambleBookUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUnscrambleBook'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('UnscrambleBookService: ' + message);
  }
  
}
