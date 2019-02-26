import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Unscramble } from './unscramble';
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
 * 	解读人服务
 *
 * @author 刘宏强
 */
@Injectable()
export class UnscrambleService {

  unscramble: Unscramble;
  
  unscrambleUrl = environment.server + 'unscramble';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('UnscrambleService');
    this.unscramble = new Unscramble();
  }

  /**
   *	查询所有解读人（分页）
   */
  getAll (page: Page, unscramble: Unscramble): Observable<any> {
  	
  	unscramble.pageNumber = page.pageNumber; 
    unscramble.size = page.size; 
    return this.http.post<any>(this.unscrambleUrl + '/findAll', unscramble)
      .pipe(
        catchError(this.handleError('getUnscrambles', []))
      );
  }
  
  /**
   *	查询所有解读人（不分页）
   */
  getAllUnscrambles (): Observable<any> {
  
    return this.http.post<any>(this.unscrambleUrl + '/findAllUnscrambles', this.unscramble)
      .pipe(
        catchError(this.handleError('getAllUnscrambles', []))
      );
  }

  /**
   * 	保存解读人
   */
  add (unscramble: Unscramble): Observable<Unscramble> {
    
    return this.http.post<Unscramble>(this.unscrambleUrl + '/save', unscramble)
      .pipe(
        catchError(this.handleError('addUnscramble', unscramble))
      );
  }
  
  /**
   *	根据主键查询解读人
   */
  getOne(id: string): Observable<any> {
    const url = `${this.unscrambleUrl}/${id}`;
    return this.http.get<Unscramble>(url).pipe(
      tap(_ => this.log(`fetched unscramble id=${id}`)),
      catchError(this.handleError<Unscramble>(`getOne id=${id}`))
    );
  }

  /**
   *	修改解读人
   */
  update (unscramble: Unscramble): Observable<Unscramble> {
    return this.http.put<Unscramble>(this.unscrambleUrl + '/update', unscramble)
      .pipe(
        catchError(this.handleError('updateUnscramble', unscramble))
      );
  }
  
  /**
   *	删除解读人
   */
  delete (id: string): Observable<{}> {
    const url = `${this.unscrambleUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUnscramble'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('UnscrambleService: ' + message);
  }
  
}
