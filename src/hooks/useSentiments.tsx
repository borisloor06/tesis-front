import { useState } from "react";
import * as services from "../services/GetDataServices";

const useSentiments = () => {
	const [positiveSentiments, setPositiveSentiments] = useState<[string, number][]>([]);
	const [negativeSentiments, setNegativeSentiments] = useState<[string, number][]>([]);
	const [neutralSentiments, setNeutralSentiments] = useState<[string, number][]>([]);
	const getSentiments = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;

		const sentimentsData = analysis[0]?.emotion_analysis.average;

		const positiveSentiments: [string, number][] = [];
		const negativeSentiments: [string, number][] = [];
		const neutralSentiments: [string, number][] = [];

		const translations: { [key: string]: string } = {
			admiration: "admiración",
			amusement: "diversión",
			approval: "aprobación",
			anger: "enojo",
			annoyance: "molestia",
			caring: "cuidado",
			confusion: "confusión",
			curiosity: "curiosidad",
			desire: "deseo",
			disappointment: "decepción",
			disapproval: "desaprobación",
			disgust: "disgusto",
			embarrassment: "vergüenza",
			excitement: "emoción",
			fear: "miedo",
			gratitude: "gratitud",
			grief: "dolor",
			joy: "alegría",
			love: "amor",
			nervousness: "nerviosismo",
			neutral: "neutral",
			optimism: "optimismo",
			pride: "orgullo",
			realization: "realización",
			relief: "alivio",
			remorse: "remordimiento",
			sadness: "tristeza",
			surprise: "sorpresa",
		};

		for (const [key, value] of Object.entries(sentimentsData || {})) {
			const translatedKey = translations[key];
			if (translatedKey) {
				if (
					key === "admiration" ||
					key === "amusement" ||
					key === "approval" ||
					key === "caring" ||
					key === "curiosity" ||
					key === "desire" ||
					key === "excitement" ||
					key === "gratitude" ||
					key === "joy" ||
					key === "love" ||
					key === "optimism" ||
					key === "pride" ||
					key === "realization" ||
					key === "relief"
				) {
					positiveSentiments.push([translatedKey, value as number]);
				} else if (
					key === "anger" ||
					key === "annoyance" ||
					key === "disappointment" ||
					key === "disapproval" ||
					key === "disgust" ||
					key === "embarrassment" ||
					key === "fear" ||
					key === "grief" ||
					key === "remorse" ||
					key === "sadness"
				) {
					negativeSentiments.push([translatedKey, value as number]);
				} else {
					neutralSentiments.push([translatedKey, value as number]);
				}
			}
		}

		setPositiveSentiments(positiveSentiments);
		setNegativeSentiments(negativeSentiments);
		setNeutralSentiments(neutralSentiments);
	};

	return {
		positiveSentiments,
		negativeSentiments,
		neutralSentiments,
		getSentiments,
	};
};

export default useSentiments;
