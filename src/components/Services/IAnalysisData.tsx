export default interface IAnalysisData {
	average_author_comment_count: number;
	average_comment_post_count: number;
	average_comment_score: number;
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
	transformer_analysis: {
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
	};
	vader_analysis: {
		average: {
			sentiment_score: number;
		};
		labels: {
			positive: number;
			neutral: number;
			negative: number;
		};
	};
}
