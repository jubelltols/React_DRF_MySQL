import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

export default function BarChart({ chartData }) {

    const labels_rent = []
    const data_rent = []

    chartData.map(( rent ) => (
        labels_rent.push(rent.day)
    ))

    chartData.map(( rent ) => (
        data_rent.push(rent.countRent)
    ))

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of bike rentals in last 7 days',
            },
        },
    };

    const labels = labels_rent;

    const data = {
        labels,
        datasets: [
            {
                label: 'Number of bike rentals',
                data: data_rent,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}