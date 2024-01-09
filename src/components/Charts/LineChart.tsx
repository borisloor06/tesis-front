import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export default function LinesChart({
	labels,
	datasets,
	options,
}: {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		tension?: number;
		fill?: boolean;
		borderColor?: string;
		backgroundColor?: string;
		pointRadius?: number;
		pointBorderColor?: string;
		pointBackgroundColor?: string;
	}[];
	options?: any; // Puedes ajustar el tipo de datos según tus necesidades
}) {
	const chartData = {
		labels,
		datasets: datasets.map((dataset) => ({
			label: dataset.label,
			data: dataset.data,
			tension: dataset.tension || 0.3,
			fill: dataset.fill || false,
			borderColor: dataset.borderColor || "rgba(75,192,192,1)",
			backgroundColor: dataset.backgroundColor || "rgba(75,192,192,0.4)",
			pointRadius: dataset.pointRadius || 3,
			pointBorderColor: dataset.pointBorderColor || "rgba(75,192,192,1)",
			pointBackgroundColor: dataset.pointBackgroundColor || "#fff",
		})),
	};

	return <Line data={chartData} options={options} />;
}
