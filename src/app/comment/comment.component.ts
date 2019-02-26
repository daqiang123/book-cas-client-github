import { 
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit } from '@angular/core';

import { Book } from '../book/book';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit,OnChanges {

  @Input() book:Book;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes:SimpleChanges) {
    this.book = changes.book.currentValue; 
  }

}
