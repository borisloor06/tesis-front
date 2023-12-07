import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

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

var beneficios = [0, 56, 20, 36, 80, 40, 30, 60, 25, 30, 12, 60];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var midata = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Comentarios',
            data: beneficios,
            tension: 0.3,
            fill : true,
            borderColor: '#40c639',
            backgroundColor: '#40c63972',
            pointRadius: 3,
            pointBorderColor: '#3995c6',
            pointBackgroundColor: '#3995c6aa',
        },
        {
            label: 'Posts',
            data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25],
            tension: 0.3,
            borderColor: '#c63940',
            backgroundColor: '#c6394072',
            pointRadius: 3,
            pointBorderColor: '#c63940',
            pointBackgroundColor: '#c63940aa',
        },
    ],
};

var misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: '#232232'}
        }
    }
};

export default function LinesChart() {
    return <Line data={midata} options={misoptions}/>
}