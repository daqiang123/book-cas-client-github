

import { 
	Component, 
	Input, 
	OnInit,
	Output,
	EventEmitter
}	from '@angular/core';

import { CommentService } from '../comment.service';
import { Comment } from '../comment';
import { Book } from 'src/app/book/book';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {


  @Input() book:Book;
  @Input() parent: Comment;

	@Output() commentAdded = new EventEmitter<boolean>();

	comment: Comment;

	constructor(private commentService: CommentService){}

	new_comment() {
    
		return { 
			commentId: '', 
			book: this.book, 
			commentContent: '', 
			commentParent: '', 
			userId: '', 
			username: "", 
      starCount: 0,
      commentTime:new Date(),
      replying:false
		};
	}

	ngOnInit() {
		this.reset();
	}

	reset() {
		this.comment = this.new_comment();
		if(! this.parent) {// if there is no parent comment, assign a new comment object
      this.parent = this.new_comment();
    }
      
    if(this.parent.username){
      this.comment.commentContent = "@" +  this.parent.username + ":";
		}
		
		if(this.parent.commentParent){
			//如果父级的parent不为空，我们就把当前的parent挂到上一级去，为了在数据库中只支持两级评论
			//对子级评论的回复统一搞到父级里面
			this.comment.commentParent = this.parent.commentParent;
		}else{
		this.comment.commentParent = this.parent.commentId;
		}
	}

	onSubmit() {
   
    this.comment.userId = "2";
    this.comment.username = "匿名";

    this.comment.book = this.book;
		let component = this;
		let bookId = this.book.bookId;
		this.commentService.save(this.comment,bookId)
			.subscribe(comment => {

				if(!component.comment.commentParent) {
					component.reset(); // reset form field; but form closure is not neede
				} else {
					component.parent.replying = false; // close the reply form
				}
				this.commentAdded.emit(true); // flag event on addition of comment, 
											  // so that comment list can be refreshed
			},
			error => {
	    	    alert(error.text());
		        console.log(error.text());				
			});
	} 


}
