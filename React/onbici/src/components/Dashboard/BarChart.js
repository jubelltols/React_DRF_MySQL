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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}