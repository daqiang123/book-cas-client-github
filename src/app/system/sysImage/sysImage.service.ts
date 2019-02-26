import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SysImage } from './sysImage';
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
 * 	图片服务
 *
 * @author 刘宏强
 */
@Injectable()
export class SysImageService {

  sysImage: SysImage;
  
  imageUrl = environment.server + 'sysImage';
  
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.sysImage = new SysImage();
    this.handleError = httpErrorHandler.createHandleError('ImageService');
  }

  /**
   *	查询所有图片
   */
  getAll (page: Page, sysImage: SysImage): Observable<any> {
  	
  	sysImage.pageNumber = page.pageNumber; 
    sysImage.size = page.size; 
    return this.http.post<any>(this.imageUrl + '/findAll', sysImage)
      .pipe(
        catchError(this.handleError('getImages', []))
      );
  }

  /**
   * 	保存图片
   */
  add (sysImage: SysImage): Observable<any> {
    // 
    return this.http.post<SysImage>(this.imageUrl + '/save', sysImage)
      .pipe(
        catchError(this.handleError('addImage', sysImage))
      );
  }
  
  /**
   *	根据主键查询图片
   */
  getOne(id: string): Observable<any> {
    const url = `${this.imageUrl}/${id}`;
    return this.http.get<SysImage>(url).pipe(
      tap(_ => this.log(`fetched sysImage id=${id}`)),
      catchError(this.handleError<SysImage>(`getOne id=${id}`))
    );
  }
  
  /**
   *	修改图片
   */
  update (sysImage: SysImage): Observable<any> {
    return this.http.put<SysImage>(this.imageUrl + '/update', sysImage)
      .pipe(
        catchError(this.handleError('updateImage', sysImage))
      );
  }
  
  /**
   *	删除图片
   */
  delete (id: string): Observable<{}> {
    const url = `${this.imageUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteImage'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('ImageService: ' + message);
  }

  /**
   *	查询所有父图片
   */
  getAllParent(): Observable<any> {
  	
  	return this.http.post<any>(this.imageUrl + '/findAllFather', this.sysImage)
  	.pipe(
        catchError(this.handleError('getImages', []))
      );
  }
  
  /**
   *	查询所有子图片
   */
  getAllChildren(data: string): Observable<any> {
  	
  	return this.http.post<any>(this.imageUrl + '/findAllChildren', data)
  	.pipe(
        catchError(this.handleError('getImages', []))
      );
  }
  
}
