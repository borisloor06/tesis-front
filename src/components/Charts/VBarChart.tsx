import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler
);
const options = (title: string, max: number) => ({
	responsive: true,
	plugins: {
		legend: {
			display: false,
			position: "top" as const,
		},
		title: {
			display: false,
			text: title,
		},
	},
	scales: {
		y: {
			min: 0,
			max,
		},
		x: {
			ticks: { color: "#676767" },
		},
	},
});

export default function Bars({
	labels,
	data,
	title,
	backG,
}: {
	labels: string[];
	data: number[];
	title: string;
	backG: string[];
}) {
	const chartData = {
		labels,
		datasets: [
			{
				label: "Puntuación",
				data,
				backgroundColor: backG,
			},
		],
	};

	const max = Math.max(...data);

	return <Bar data={chartData} options={options(title, max)} />;
}
