import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function PieChart({ chartData }) {


    const data = {
        labels: ['Free Slot', 'Free Bike', 'Disable Slot'],
        datasets: [
            {
                label: '# of Votes',
                data: [chartData.free_slot, chartData.free_bike, chartData.disable_slot],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data} />
    )
}