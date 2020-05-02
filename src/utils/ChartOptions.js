export function getChartSmoothieDefaults(numOfChannels) {
  return Object.assign({
    millisPerPixel: 6,
    responsive: true,
    grid: {
      fillStyle: "#555",
      strokeStyle: "rgba(0,0,0,0.1)",
      sharpLines: false,
      verticalSections: numOfChannels,
      borderVisible: true
    },
    labels: {
      disabled: true
    },
    maxValue: numOfChannels * 2,
    minValue: 0
  });
}

export function getLineChartJsDefaults(minX = 0, maxX = 64, xLabel="Frequency (Hz)", yLabel = "Amplitude (μV)") {
  return {
    lineTension: 0,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: yLabel,
            fontColor: "white",
          },
          // type: "logarithmic",
          position: "left",
          ticks: {
            min: 0.1, //minimum tick
            max: 1000, //maximum tick
            fontColor: "white",
            callback: function(value) {
              return Number(value.toString()); //pass tick values as a string into Number function
            }
          },
          afterBuildTicks: function(chartObj) {
            //Build ticks labelling as per your need
            chartObj.ticks = [];
            chartObj.ticks.push(100);
            chartObj.ticks.push(500);
            chartObj.ticks.push(1000);
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: xLabel,
            fontColor: "white",
          },
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "white",
            min: minX,
            max: maxX
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
  };
}

export function getBarChartJsDefaults(yLabel="Band Power") {
  return {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: yLabel,
            fontColor: "white",
          },
          // type: "logarithmic",
          position: "left",
          ticks: {
            min: 0.1, //minimum tick
            max: 1000, //maximum tick
            fontColor: "white",
            callback: function(value) {
              return Number(value.toString()); //pass tick values as a string into Number function
            }
          },
          afterBuildTicks: function(chartObj) {
            //Build ticks labelling as per your need
            chartObj.ticks = [];
            // chartObj.ticks.push(0.1);
            // chartObj.ticks.push(1);
            // chartObj.ticks.push(10);
            chartObj.ticks.push(100);
            chartObj.ticks.push(500);
            chartObj.ticks.push(1000);
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "white"
          }
        }
      ]
    },
    animation: {
      duration: 400
    },
    legend: {
      display: false
    },
    tooltips: { enabled: false },
    hover: { mode: null },
    responsive: true,
    maintainAspectRatio: false
  };
}
