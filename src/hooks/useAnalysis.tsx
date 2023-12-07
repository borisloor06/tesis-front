import { useEffect, useState } from "react";
import * as services from "../services/GetDataServices";

const useAnalysis = () => {
	const [vaderAnalysis, setVaderAnalysis] = useState<[string, number][]>([]);
	const [transformerAnalysis, setTransformerAnalysis] = useState<[string, number][]>([]);
	const [topicExtraction, setTopicExtraction] = useState<[string, number][]>([]);

	const getAnalys = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;

		const vaderAnalysisData = analysis[0]?.vader_analysis.count;
		const transformersAnalysisData = analysis[0]?.transformer_analysis.count;
		const topicExtractionData = analysis[0]?.topic_extraction;

		const vaderAnalysis: [string, number][] = Object.entries(vaderAnalysisData || {});
		const transformerAnalysis: [string, number][] = Object.entries(transformersAnalysisData || {});
		const topicExtraction: [string, number][] = Object.entries(topicExtractionData || {});

		setVaderAnalysis(vaderAnalysis);
		setTransformerAnalysis(transformerAnalysis);
		setTopicExtraction(topicExtraction);
	};

	return {
		vaderAnalysis,
		transformerAnalysis,
		topicExtraction,
		getAnalys,
	};
};

export default useAnalysis;
