import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = (title: string) => ({
	responsive: true,
	plugins: {
		legend: {
			display: true,
			position: "left" as const,
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
});

export function DonutChart({
	labels,
	data,
	title,
	borderColors,
	backgroundColors,
}: {
	labels: string[];
	data: number[];
	title: string;
	borderColors: string[];
	backgroundColors: string[];
}) {
	const donutData = {
		labels: labels,
		datasets: [
			{
				label: "Cantidad",
				data: data,
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={donutData} options={options(title)} />;
}
