import { useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../redux/store";

const useAnalysis = () => {
	const [vaderAnalysis, setVaderAnalysis] = useState<[string, number][]>([]);
	const [transformerAnalysis, setTransformerAnalysis] = useState<[string, number][]>([]);
	const [topicExtraction, setTopicExtraction] = useState<[string, number][]>([]);

	const analysis = useSelector((store: AppStore) => store.analisis);
	const analisisFiltered = useSelector((store: AppStore) => store.filtered);

	const GetAnalys = () => {
		const vaderAnalysisData = analisisFiltered.total_posts
			? analisisFiltered.vader_analysis.count
			: analysis.vader_analysis.count;
		const transformersAnalysisData = analisisFiltered.total_posts
			? analisisFiltered.transformer_analysis.count
			: analysis.transformer_analysis.count;
		const topicExtractionData = analisisFiltered.total_posts
			? analisisFiltered.topic_extraction
			: analysis.topic_extraction;

		const vaderAnalysis = Object.entries(vaderAnalysisData);
		const transformerAnalysis = Object.entries(transformersAnalysisData);
		const topicExtraction = Object.entries(topicExtractionData);

		setVaderAnalysis(vaderAnalysis);
		setTransformerAnalysis(transformerAnalysis);
		setTopicExtraction(topicExtraction);
	};

	return {
		vaderAnalysis,
		transformerAnalysis,
		topicExtraction,
		getAnalys: GetAnalys,
	};
};

export default useAnalysis;
