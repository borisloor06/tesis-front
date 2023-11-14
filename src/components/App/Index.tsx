import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../../styles/app.css';

function Index() {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const data = {
//         labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
//         datasets: [
//           {
//             label: 'Datos de ejemplo',
//             data: [12, 19, 3, 5, 2],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       };

//       const options = {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       };

//       const ctx = chartRef.current.getContext('2d');
//       if (ctx) {
//         new Chart(ctx, {
//           type: 'bar',
//           data: data,
//           options: options,
//         });
//       }
//     }
//   }, []);

  return (
    <main className='main-index'>
      <div className='sur-container'>
        <div>Conjunto de gráficos</div>
        <div>
          Gráfico 1
          <canvas width='400' height='200'></canvas>
        </div>
        <div>
          Gráfico 2
          <canvas width='400' height='200'></canvas>
        </div>
        <div>
          Gráfico 3
          <canvas width='400' height='200'></canvas>
        </div>
      </div>
      <aside className='can-aside'>
        <h3>Gráfico</h3>
        <div className='list-can'>Gráfico 1</div>
      </aside>
    </main>
  );
}

export default Index;
