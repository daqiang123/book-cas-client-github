import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Referee } from './referee';
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
export class RefereeService {

  referee: Referee;
  
  refereeUrl = environment.server + 'referee';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('RefereeService');
    this.referee = new Referee();
  }

  /**
   *	查询所有推荐人（分页）
   */
  getAll (page: Page, referee: Referee): Observable<any> {
  	
  	referee.pageNumber = page.pageNumber; 
    referee.size = page.size; 
    return this.http.post<any>(this.refereeUrl + '/findAll', referee)
      .pipe(
        catchError(this.handleError('getReferees', []))
      );
  }
  
  /**
   *	查询所有推荐人（不分页）
   */
  getAllReferees (): Observable<any> {
  
    return this.http.post<any>(this.refereeUrl + '/findAllReferees', this.referee)
      .pipe(
        catchError(this.handleError('getAllReferees', []))
      );
  }

  /**
   * 	保存推荐人
   */
  add (referee: Referee): Observable<Referee> {
    
    return this.http.post<Referee>(this.refereeUrl + '/save', referee)
      .pipe(
        catchError(this.handleError('addReferee', referee))
      );
  }
  
  /**
   *	根据主键查询推荐人
   */
  getOne(id: string): Observable<any> {
    const url = `${this.refereeUrl}/${id}`;
    return this.http.get<Referee>(url).pipe(
      tap(_ => this.log(`fetched referee id=${id}`)),
      catchError(this.handleError<Referee>(`getOne id=${id}`))
    );
  }

  /**
   *	修改推荐人
   */
  update (referee: Referee): Observable<Referee> {
    return this.http.put<Referee>(this.refereeUrl + '/update', referee)
      .pipe(
        catchError(this.handleError('updateReferee', referee))
      );
  }
  
  /**
   *	删除推荐人
   */
  delete (id: string): Observable<{}> {
    const url = `${this.refereeUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteReferee'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('RefereeService: ' + message);
  }
  
}
