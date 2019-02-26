import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Classes } from './classes';
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
 * 	分类服务
 *
 * @author 刘宏强
 */
@Injectable()
export class ClassesService {

  classes: Classes;
  
  classesUrl = environment.server + 'classes';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('ClassesService');
    this.classes = new Classes();
  }

  /**
   *	查询所有分类（分页）
   */
  getAll (page: Page, classes: Classes): Observable<any> {
  	classes.pageNumber = page.pageNumber; 
    classes.size = page.size; 
    return this.http.post<any>(this.classesUrl + '/findAll', classes)
      .pipe(
        catchError(this.handleError('getClassess', []))
      );
  }
  
  /**
   *	查询所有分类（不分页）
   */
  getAllClasses (): Observable<any> {
    return this.http.post<any>(this.classesUrl + '/findAllList', this.classes)
      .pipe(
        catchError(this.handleError('getClassess', []))
      );
  }
  
  /**
   *	获取所有父分类
   */
  getAllClassesParent (): Observable<any> {
  	
    return this.http.post<any>(this.classesUrl + '/findAllClassesParent', this.classes)
      .pipe(
        catchError(this.handleError('getAllClassesParent', []))
      );
  }

  /**
   * 	保存分类
   */
  add (classes: Classes): Observable<Classes> {
    
    return this.http.post<Classes>(this.classesUrl + '/save', classes)
      .pipe(
        catchError(this.handleError('addClasses', classes))
      );
  }
  
  /**
   *	根据主键查询分类
   */
  getOne(id: string): Observable<any> {
    
    const url = `${this.classesUrl}/${id}`;
    return this.http.get<Classes>(url).pipe(
      tap(_ => this.log(`fetched classes id=${id}`)),
      catchError(this.handleError<Classes>(`getOne id=${id}`))
    );
  }

  /**
   *	修改分类
   */
  update (classes: Classes): Observable<Classes> {
    return this.http.put<Classes>(this.classesUrl + '/update', classes)
      .pipe(
        catchError(this.handleError('updateClasses', classes))
      );
  }
  
  /**
   *	删除分类
   */
  delete (id: string): Observable<{}> {
    const url = `${this.classesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteClasses'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('ClassesService: ' + message);
  }
  
}
