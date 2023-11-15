import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

export const data = {
	datasets: [
		{
			label: "Red dataset",
			data: Array.from({ length: 50 }, () => ({
				x: getRandomNumber(-100, 100),
				y: getRandomNumber(-100, 100),
				r: getRandomNumber(5, 20),
			})),
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "Blue dataset",
			data: Array.from({ length: 50 }, () => ({
				x: getRandomNumber(-100, 100),
				y: getRandomNumber(-100, 100),
				r: getRandomNumber(5, 20),
			})),
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function BubbleChart() {
	return <Bubble options={options} data={data} />;
}
