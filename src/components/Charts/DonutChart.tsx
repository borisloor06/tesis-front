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
	},
});

export function DonutChart({
	labels,
	data,
	title,
}: {
	labels: string[];
	data: number[];
	title: string;
}) {
	const donutData = {
		labels: labels,
		datasets: [
			{
				label: "Puntuación",
				data: data,
				backgroundColor: ["#141DF0bb", "#F05911cc", "#1EF00Acc"],
				borderColor: ["#141DF0aa", "#F05911ff", "#1EF00Aff"],
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={donutData} options={options(title)} />;
}
