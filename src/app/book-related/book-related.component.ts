import { 
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit } from '@angular/core';

import { Book } from '../book/book';
import { Page } from '../paging/model/page';
import { BookClassesService } from '../bookClasses/bookClasses.service';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-book-related',
  templateUrl: './book-related.component.html',
  styleUrls: ['./book-related.component.css']
})
export class BookRelatedComponent implements OnInit ,OnChanges{

  @Input() book:Book;

  	// 服务端IP地址和端口
	server: string;

 // 行列表
  relatedBooks = new Array<Book>();

  constructor(
    private bookClassesService: BookClassesService,
  ) {

    this.server = environment.server; 

   }

  ngOnInit() {
    if(this.book){
      this.getRelatedBooks(this.book.bookId);
    }
  }
  ngOnChanges(changes:SimpleChanges) {
    console.log("ngOnChanges==================");

    this.book = changes.book.currentValue;
    //console.log(changes);
    //console.log(JSON.stringify(changes,null,2));
    if(this.book){
      this.getRelatedBooks(this.book.bookId);
    }
  }

  getRelatedBooks(bookId:String){
    this.bookClassesService.getRelatedBooks(bookId).subscribe(books => {
      this.relatedBooks = books;
    });
  }
}
