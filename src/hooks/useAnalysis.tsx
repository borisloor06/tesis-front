import { useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../redux/store";

const useAnalysis = () => {
	const [vaderAnalysis, setVaderAnalysis] = useState<[string, number][]>([]);
	const [transformerAnalysis, setTransformerAnalysis] = useState<[string, number][]>([]);
	const [topicExtraction, setTopicExtraction] = useState<[string, number][]>([]);

	const analysis = useSelector((store: AppStore) => store.analisis);
	const GetAnalys = () => {
		const vaderAnalysisData = analysis.vader_analysis.count;
		const transformersAnalysisData = analysis.transformer_analysis.count;
		const topicExtractionData = analysis.topic_extraction;

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
