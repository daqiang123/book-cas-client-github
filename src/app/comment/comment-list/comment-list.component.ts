import { 
  Component,
  Input,  
  OnChanges,
  SimpleChanges,
  OnInit } from '@angular/core';



import { CommentService } from '../comment.service';
import { Comment,CommentWrap } from '../comment';
import { Book } from 'src/app/book/book';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit,OnChanges {

  @Input() book:Book;

  comments: CommentWrap[];
	commentsTreeExpanded: any[];
	user: any = {canDelete: true};

	constructor(private commentService: CommentService){}

	ngOnInit() {
		this.getCommentsWithReplies();
	}

	ngOnChanges(changes:SimpleChanges) {
		this.book = changes.book.currentValue; 
		this.getCommentsWithReplies();
	  }

	// private getComments() { // retrieves all comments
	// 	this.commentService.getComments().subscribe(comments => {
	// 		//this.comments = comments;
	// 	});
	// }

	private getCommentsWithReplies() { // retrieves all comments in hierarchy tree
		var component = this;
    	console.log('checkpoint 1: ');
    	console.log(component);
		this.commentService.getCommentsWithReplies(component.book.bookId).subscribe(comments => {		

      
			component.comments = comments;
		//	console.log('checkpoint 2: ');
		//	console.log(component);				
		//	component.commentsTreeExpanded = component.expandCommentsTree(component.comments);
			//console.log('checkpoint 3: ');
			//console.log(component);					
		});
	}


	private expandCommentsTree(comments: any[]):Array<any> {
		var result: any[] = [];
		var component = this;
		comments.forEach(function(comment){
			result.push(comment);
			var temp: any[];
			if(comment.replies){
				console.log('Recursive call to get replies of...');
				console.log(comment);
				temp = component.expandCommentsTree(comment.replies);
				result.push.apply(result, temp);
			}
		});
		return result;
	}
/*  Below method is commented as it is meant for admin purpose
	private deleteComment(comment: Comment) {
		var component = this;
		this.commentService
			.delete(comment)
			.then(response => {
				component.refresh(true);  // refresh the comment list
			})
	}
*/
	public refresh(proceed: boolean) {
		this.getCommentsWithReplies();
	}

	public upvoted(comment: Comment) {
		comment.starCount++; // increment upvotes count by 1
		var bookId = this.book.bookId;
		this.commentService.save(comment,bookId).subscribe(comment => {});
	}

	// public downvoted(comment: Comment) {
	// 	comment.downvotes++; // increment upvotes count by 1
	// 	this.commentService.save(comment).subscribe(comment => {});
	// }	

	// public clear() {
	// 	var component = this;
	// 	this.commentService.clearComments()
	// 		.then( () => {
	// 			component.refresh(true);
	// 		});
	// }

}
