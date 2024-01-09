export default interface IPost {
	title: string;
	score: number;
	id: string;
	subreddit: string;
	url: string;
	num_comments: number;
	selftext: string;
	created: number;
	created_utc: number;
	author: string;
	upvote_ratio: number;
	created_date: string;
}

export interface ResponsePosts {
	posts: IPost[];
	total: number;
}
