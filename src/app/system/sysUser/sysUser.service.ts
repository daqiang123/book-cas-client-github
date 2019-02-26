/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SysUser } from './sysUser';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

import { Page } from './../../paging/model/page';

import { environment } from './../../../environments/environment';

import { MessageService } from './../../message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

/**
 * 	用户服务
 *
 * @author 刘宏强
 */
@Injectable()
export class SysUserService {

  sysUser: SysUser;
  
  userUrl = environment.server + 'sysUser';
  
  bookUrl = environment.server + 'book';
  
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
    this.sysUser = new SysUser();
  }

  /**
   *	查询所有用户
   */
  getAll (page: Page, sysUser: SysUser): Observable<any> {
  	
  	sysUser.pageNumber = page.pageNumber; 
    sysUser.size = page.size; 
    return this.http.post<any>(this.userUrl + '/findAll', sysUser)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  /**
   * 	保存用户
   */
  add (sysUser: SysUser): Observable<SysUser> {
    
    return this.http.post<SysUser>(this.userUrl + '/save', sysUser)
      .pipe(
        catchError(this.handleError('addUser', sysUser))
      );
  }
  
  /**
   *	根据主键查询用户
   */
  getOne(id: string): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<SysUser>(url).pipe(
      tap(_ => this.log(`fetched sysUser id=${id}`)),
      catchError(this.handleError<SysUser>(`getOne id=${id}`))
    );
  }
  
  /**
   *	获取当前用户
   */
  getCurrentUser(): Observable<any> {
    const url = `${this.bookUrl}/getCurrentUser`;
    return this.http.get<SysUser>(url).pipe(
      tap(_ => this.log(`getCurrentUser`)),
      catchError(this.handleError<SysUser>(`getCurrentUser`))
    );
  }

  /**
   *	修改用户
   */
  update (sysUser: SysUser): Observable<SysUser> {
    return this.http.put<SysUser>(this.userUrl + '/update', sysUser)
      .pipe(
        catchError(this.handleError('updateUser', sysUser))
      );
  }
  
  /**
   *	修改头像
   */
  updateAvatar (sysUser: SysUser): Observable<SysUser> {
    return this.http.put<SysUser>(this.userUrl + '/updateAvatar', sysUser)
      .pipe(
        catchError(this.handleError('updateAvatar', sysUser))
      );
  }
  
  /**
   *	检查旧密码
   */
  checkOldPassword (oldPassword: string): Observable<any> {
    
    this.sysUser.password = oldPassword;
    
    return this.http.post<SysUser>(this.userUrl + '/findByOldPassword', this.sysUser)
      .pipe(
        catchError(this.handleError('updatePassword', this.sysUser))
      );
  }
  
  /**
   *	修改密码
   */
  updatePassword (sysUser: SysUser): Observable<SysUser> {
    return this.http.put<SysUser>(this.userUrl + '/updatePassword', sysUser)
      .pipe(
        catchError(this.handleError('updatePassword', sysUser))
      );
  }
  
  /**
   *	根据主键重置用户密码
   */
  resetPassword (id: string): Observable<{}> {
    const url = `${this.userUrl}/resetPassword/${id}`;
    return this.http.post(url, httpOptions)
      .pipe(
        catchError(this.handleError('resetPassword'))
      );
  }
  
  /**
   *	删除用户
   */
  delete (id: string): Observable<{}> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }
  
}
