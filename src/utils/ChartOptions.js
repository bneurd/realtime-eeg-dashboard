export function getChartSmoothieDefaults () {
    return Object.assign({
        millisPerPixel: 10,
        responsive: true,
        // millisPerLine: 1,
        grid: {
            fillStyle: '#555',
            strokeStyle: 'rgba(0,0,0,0.1)',
            sharpLines: false,
            // verticalSections: 8,
            borderVisible: true
        },
        labels: {
            disabled: true
        },
        // maxValue: 8 * 2,
        // minValue: 0
    });
}