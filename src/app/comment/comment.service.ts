import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';
import { Observable,of} from 'rxjs';

import { Comment,CommentWrap } from "./comment";

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  baseUrl = environment.server + 'bookComment';

	constructor(private http: HttpClient) {}

	// getComments(): Observable<Comment[]> {
	// 	return this.http.get<Comment[]>(this.commentsUrl());
	// }

	getCommentsWithReplies(bookId:String) : Observable<CommentWrap[]>{
		console.log("Inside comment.service >> getCommentsWithReplies :" + bookId );
		return this.http.get<CommentWrap[]>(this.apiUrl()+'/findBookCommentes/' + bookId);
	}

	save(comment: Comment,bookId:String): Observable<Comment> {
		if(comment.commentId) {
			return this.put(comment,bookId);
		} else {
			return this.post(comment,bookId);
		}
	}


	// Add new comment
	private post(comment: Comment,bookId:String): Observable<Comment> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		return this.http
			.post<Comment>(this.saveUrl(bookId), comment, {});
	}


	// Update existing Comment
	private put(comment: Comment,bookId:String): Observable<any>  {
		let headers = new HttpHeaders({
			'Content-Type': `application/json`
		});
		let url = this.updateUrl(bookId);//`${this.updateUrl()}/${comment.commentId}`;
		return this.http
			.put(url, comment, { headers: headers });
	}

	private handleError(error: any) {
		console.log('An error occurred: ');
		console.log(error);
		return Promise.reject(error.message || error);
	}

	private apiUrl() {
		return this.baseUrl;
	}

	private saveUrl(bookId) {
		return this.apiUrl()+'/save/' + bookId;
  }
  
  private updateUrl(bookId) {
		return this.apiUrl()+'/update/' + bookId;
	}

/*  Below function is commented as it is meant for admin purpose
	delete(comment: Comment) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.commentsUrl()}/${comment._id}`;

		return this.http
			.delete(url, { headers: headers })
			.toPromise()
			.catch(this.handleError);
	}

*/

/** Below function is added for Demo purpose only; For production use, it SHOULD BE commented out OR Removed */
	// clearComments():any {
	// 	let headers = new HttpHeaders();
	// 	headers.append('Content-Type', 'application/json');

	// 	let url = `${this.commentsUrl()}/clear/*`;

	// 	return this.http
	// 		.delete(url, { headers: headers })
	// 		.toPromise()
	// 		.catch(this.handleError);		
	// }
}
