import { Component } from '@angular/core';
import { MessageService } from '../message.service';

/**
 * 	消息组件
 * 
 * @author 刘宏强
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}