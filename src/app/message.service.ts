import { Injectable } from '@angular/core';

/**
 * 	消息服务
 *
 * @author 刘宏强
 */
@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}