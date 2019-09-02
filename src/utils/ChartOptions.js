export function getChartSmoothieDefaults(numOfChannels) {
    return Object.assign({
        millisPerPixel: 5,
        responsive: true,
        grid: {
            fillStyle: '#555',
            strokeStyle: 'rgba(0,0,0,0.1)',
            sharpLines: false,
            verticalSections: numOfChannels,
            borderVisible: true,
        },
        labels: {
            disabled: true
        },
        maxValue: numOfChannels * 2,
        minValue: 0
    });
}

export function getLineChartJsDefaults(minX = 0, maxX = 64) {
    return {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                        max: 500
                    },
                    gridLines: {
                        display: true
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontColor: "white",
                        min: minX,
                        max: maxX,
                    }
                }
            ]
        },
        legend: {
            display: false
        },
        animation: {
            duration: 400
        },
        showTooltips: false,
        responsive: true,
        maintainAspectRatio: false
    }
}