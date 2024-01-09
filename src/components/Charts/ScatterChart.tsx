import {
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

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
			label: "A dataset",
			data: Array.from({ length: 21 }, () => ({
				x: getRandomNumber(0, 10),
				y: getRandomNumber(0, 10),
			})),
			backgroundColor: "rgba(255, 99, 132, 1)",
		},
	],
};

function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function ScatterChart() {
	return <Scatter options={options} data={data} />;
}
