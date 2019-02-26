import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Carousel } from './carousel';
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
 * 	轮播图服务
 *
 * @author 刘宏强
 */
@Injectable()
export class CarouselService {

  carousel: Carousel;
  
  carouselUrl = environment.server + 'carousel';
  
  private handleError: HandleError;

  /**
   *	
   */
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('CarouselService');
    this.carousel = new Carousel();
  }

  /**
   *	查询所有轮播图
   */
  getAll (page: Page, carousel: Carousel): Observable<any> {
  	
  	carousel.pageNumber = page.pageNumber; 
    carousel.size = page.size; 
    return this.http.post<any>(this.carouselUrl + '/findAll', carousel)
      .pipe(
        catchError(this.handleError('getCarousels', []))
      );
  }
  
  /**
   *	查询所有轮播图（不分页）
   */
  getAllCarouseles (): Observable<any> {
    return this.http.post<any>(this.carouselUrl + '/findAllCarouseles', this.carousel)
      .pipe(
        catchError(this.handleError('getAllCarouseles', []))
      );
  }
  

  /**
   * 	保存轮播图
   */
  add (carousel: Carousel): Observable<Carousel> {
    
    return this.http.post<Carousel>(this.carouselUrl + '/save', carousel)
      .pipe(
        catchError(this.handleError('addCarousel', carousel))
      );
  }
  
  /**
   *	根据主键查询轮播图
   */
  getOne(id: string): Observable<any> {
    const url = `${this.carouselUrl}/${id}`;
    return this.http.get<Carousel>(url).pipe(
      tap(_ => this.log(`fetched carousel id=${id}`)),
      catchError(this.handleError<Carousel>(`getOne id=${id}`))
    );
  }

  /**
   *	修改轮播图
   */
  update (carousel: Carousel): Observable<Carousel> {
    return this.http.put<Carousel>(this.carouselUrl + '/update', carousel)
      .pipe(
        catchError(this.handleError('updateCarousel', carousel))
      );
  }
  
  /**
   *	删除轮播图
   */
  delete (id: string): Observable<{}> {
    const url = `${this.carouselUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteCarousel'))
      );
  }
  
  /**
   *	记录日志
   */
  private log(message: string) {
    this.messageService.add('CarouselService: ' + message);
  }
  
}
