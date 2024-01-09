import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = (title?: string) => ({
	responsive: true,
	indexAxis: "y" as const,
	elements: {
		bar: {
			borderWidth: 2,
		},
	},
	plugins: {
		legend: {
			display: false,
			position: "right" as const,
		},
		title: {
			display: false,
			text: title,
		},
		tooltip: {
			enabled: true,
			padding: 10,
			caretPadding: 10,
			caretSize: 9,
			cornerRadius: 10,
			displayColors: true,
			backgroundColor: "#000000cc",
			bodyFont: {
				size: 16,
			},
			bodySpacing: 10,
			titleFont: {
				size: 16,
			},
			titleSpacing: 10,
		},
	},
	scales: {
		y: {
			position: "right" as const,
			ticks: {
				font: {
					size: 16,
				},
			},
		},
		x: {
			ticks: {
				font: {
					size: 16,
				},
			},
		},
	},
});

export function HBarChart({
	labels,
	data,
	title,
	backG,
}: {
	labels: string[];
	data: number[];
	title?: string;
	backG: string[];
}) {
	const chartData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: backG,
			},
		],
	};

	return <Bar data={chartData} options={options(title)} />;
}
