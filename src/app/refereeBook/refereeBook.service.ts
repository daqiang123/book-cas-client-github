import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { RefereeBook } from './refereeBook';
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
 * 	推荐人服务
 *
 * @author 刘宏强
 */
@Injectable()
export class RefereeBookService {

  refereeBook: RefereeBook;
  
  refereeBookUrl = environment.server + 'refereeBook';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('RefereeBookService');
  }

  /**
   *	查询所有推荐人
   */
  getAll (page: Page, refereeBook: RefereeBook): Observable<any> {
  	
  	refereeBook.pageNumber = page.pageNumber; 
    refereeBook.size = page.size; 
    return this.http.post<any>(this.refereeBookUrl + '/findAll', refereeBook)
      .pipe(
        catchError(this.handleError('getRefereeBooks', []))
      );
  }

  /**
   * 	保存推荐人
   */
  add (refereeBook: RefereeBook): Observable<RefereeBook> {
    return this.http.post<RefereeBook>(this.refereeBookUrl + '/save', refereeBook)
      .pipe(
        catchError(this.handleError('addRefereeBook', refereeBook))
      );
  }
  
  /**
   *	根据主键查询推荐人
   */
  getOne(id: string): Observable<any> {
    const url = `${this.refereeBookUrl}/${id}`;
    return this.http.get<RefereeBook>(url).pipe(
      tap(_ => this.log(`fetched refereeBook id=${id}`)),
      catchError(this.handleError<RefereeBook>(`getOne id=${id}`))
    );
  }

  /**
   *	修改推荐人
   */
  update (refereeBook: RefereeBook): Observable<RefereeBook> {
    return this.http.put<RefereeBook>(this.refereeBookUrl + '/update', refereeBook)
      .pipe(
        catchError(this.handleError('updateRefereeBook', refereeBook))
      );
  }
  
  /**
   *	删除推荐人
   */
  delete (id: string): Observable<{}> {
    const url = `${this.refereeBookUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteRefereeBook'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('RefereeBookService: ' + message);
  }
  
}
