export function getChartSmoothieDefaults () {
    return Object.assign({
        millisPerPixel: 5,
        responsive: true,
        // millisPerLine: 1,
        grid: {
            fillStyle: '#454545',
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