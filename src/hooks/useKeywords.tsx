import { useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../redux/store";
import IAnalysisData from "../services/interfaces/IAnalysisData";

const useKeywords = () => {
	const [data, setData] = useState<IAnalysisData>({} as IAnalysisData);
	const [wcKeywords, setWcKeywords] = useState<[string, number][]>([]);
	const [topKeywords, setTopKeywords] = useState<[string, number][]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNextWord = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % topKeywords.length);
	};

	const handlePreviousWord = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? topKeywords.length - 1 : (prevIndex - 1) % topKeywords.length
		);
	};

	const analysis = useSelector((store: AppStore) => store.analisis);
	const analisisFiltered = useSelector((store: AppStore) => store.filtered);
	const GetKeywords = () => {
		try {
			const commentKeywords = analisisFiltered.total_posts
				? analisisFiltered.keywords.comment
				: analysis.keywords.comment;
			const postKeywords = analisisFiltered.total_posts
				? analisisFiltered.keywords.posts
				: analysis.keywords.posts;

			// Filtrar las 10 palabras con la puntuación más alta de los comentarios
			const wcKeywords: [string, number][] = Object.entries(commentKeywords)
				.filter(
					([word, score]) =>
						isNaN(Number(word)) &&
						typeof score === "number" &&
						word.length <= 15 &&
						!word.includes("chatgpt") &&
						!/\d/.test(word)
				)
				.sort(([, scoreA]: any, [, scoreB]: any) => scoreB - scoreA)
				.slice(0, 60)
				.map(([word, score], index) => [word, 60 - index]);

			// Filtrar las 10 palabras con la puntuación más alta de los títulos
			const topKeywords: [string, number][] = Object.entries(postKeywords)
				.filter(([word, score]) => isNaN(Number(word)) && typeof score === "number")
				.sort(([, scoreA]: any, [, scoreB]: any) => scoreB - scoreA)
				.slice(0, 21);

			setTopKeywords(topKeywords);
			setWcKeywords(wcKeywords);
			analisisFiltered.total_posts ? setData(analisisFiltered) : setData(analysis);
		} catch (error) {
			console.error("Error al obtener datos:", error);
		}
	};

	return {
		data,
		wcKeywords,
		topKeywords,
		getKeywords: GetKeywords,
		handleNextWord,
		handlePreviousWord,
		currentIndex,
	};
};

export default useKeywords;
