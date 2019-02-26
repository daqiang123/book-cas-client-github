import { Book } from "../book/book";

export class Comment {

	constructor(
		public commentId: string,
		public book: Book, 
		public commentContent: string, 
		public commentParent: string,
        public userId: string,
        public username: string,
        public starCount: number,
        public commentTime:Date,

        //界面控制
		public replying: boolean,
	){}
}

export class CommentWrap {
	constructor(
		public parent: Comment,
		public children: []
	){}
}