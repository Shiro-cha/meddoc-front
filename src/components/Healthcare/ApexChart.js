import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ seriesData }) => {
    console.log(seriesData)
    const [chartData, setChartData] = useState({
        series: seriesData,
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 400
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    });

    // Fetch data and update state (useEffect can be used for this purpose)
    useEffect(() => {

        setChartData({
            series: seriesData,
            options: {
                chart: {
                    type: 'donut',
                    height: "100%",
                    maxWidth: "100%",
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                labels: ['Annuler', 'Fait', 'Manqués', 'Reportés', 'En attente'],
                
            },
        })

    }, [seriesData]);

    return (
        <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
        </div>
    );
};


export default ApexChart;