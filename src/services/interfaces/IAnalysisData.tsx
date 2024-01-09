interface IEmotions {
	positive: number;
	neutral: number;
	negative: number;
}

interface ISentiments {
	admiration: number;
	amusement: number;
	anger: number;
	annoyance: number;
	approval: number;
	caring: number;
	confusion: number;
	curiosity: number;
	desire: number;
	disappointment: number;
	disapproval: number;
	disgust: number;
	embarrassment: number;
	excitement: number;
	fear: number;
	gratitude: number;
	grief: number;
	joy: number;
	love: number;
	nervousness: number;
	neutral: number;
	optimism: number;
	pride: number;
	realization: number;
	relief: number;
	remorse: number;
	sadness: number;
	surprise: number;
}

interface CommentsByMonth {
	[key: string]: number;
}

interface PostsByMonth {
	[key: string]: number;
}

interface CommentsDates {
	comments_count: CommentsByMonth;
	posts_count: PostsByMonth;
}

interface PostsDates {
	posts_count: PostsByMonth;
}

export default interface IAnalysisData {
	average_author_comment_count: number;
	average_comment_post_count: number;
	average_comment_score: number;
	comments_grouped: CommentsDates;
	posts_grouped: PostsDates;
	posts_dates: {
		fecha_inicio: number;
		fecha_fin: number;
	};
	comments_dates: {
		fecha_inicio: number;
		fecha_fin: number;
	};
	keywords: {
		posts: {
			[key: string]: number;
		};
		comment: {
			[key: string]: number;
		};
		all: {
			[key: string]: number;
		};
	};
	topic_extraction: {
		[key: string]: number;
	};
	total_authors: number;
	total_comments: number;
	total_posts: number;
	emotion_analysis: {
		total_count: number;
		total_average: number;
		average: ISentiments;
		count: ISentiments;
	};
	transformer_analysis: {
		total_count: number;
		total_average: number;
		average: IEmotions;
		count: IEmotions;
	};
	vader_analysis: {
		total_count: number;
		total_average: number;
		average: IEmotions;
		count: IEmotions;
	};
}
