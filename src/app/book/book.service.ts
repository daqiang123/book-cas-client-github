import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// 图书
import { Book } from './book';

import { HttpErrorHandler, HandleError } from './../http-error-handler.service';

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
 * 	图书服务
 *
 * @author 刘宏强
 */
@Injectable()
export class BookService {

  book: Book;
  
  bookUrl = environment.server + 'book';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('BookService');
  }

  /**
   *	查询所有图书
   */
  getAll (page: Page, book: Book): Observable<any> {
  	
  	book.pageNumber = page.pageNumber; 
    book.size = page.size;
    return this.http.post<any>(this.bookUrl + '/findAll', book)
      .pipe(
        catchError(this.handleError('getBooks', []))
      );
  }

  /**
   * 	保存图书
   */
  add (book: Book): Observable<Book> {
    
    return this.http.post<Book>(this.bookUrl + '/save', book)
      .pipe(
        catchError(this.handleError('addBook', book))
      );
  }
  
  /**
   *	根据主键查询图书
   */
  getOne(id: string): Observable<any> {
    const url = `${this.bookUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getOne id=${id}`))
    );
  }

  /**
   *	修改图书
   */
  update (book: Book): Observable<Book> {
    return this.http.put<Book>(this.bookUrl + '/update', book)
      .pipe(
        catchError(this.handleError('updateBook', book))
      );
  }
  
  /**
   *	删除图书
   */
  delete (id: string): Observable<{}> {
    const url = `${this.bookUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteBook'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('BookService: ' + message);
  }
  
}
