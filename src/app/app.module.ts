/**
 *  版权所有（C）2018，西安大华时代网络科技有限公司。保留所有权利。
 */
import * as $ from 'jquery';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

import {HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {HttpErrorHandler} from './http-error-handler.service';

import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';

// 用户
import {SysUserService} from './system/sysUser/sysUser.service';

/**
 *  应用模块
 *
 *  @author 刘宏强
 */
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    HeaderComponent,
    FooterComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    SysUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
