interface Comment {
	comments_count: number;
	posts_count: number;
}

interface Post {
	posts_count: number;
}

interface PostsDict {
	posts_count: Record<string, number>;
}

export default interface DataStructure {
	comments: Comment[];
	posts: Post[];
	posts_dict: PostsDict;
}
