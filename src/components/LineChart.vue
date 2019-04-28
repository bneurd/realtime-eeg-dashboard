<script>
import { Line, mixins } from "vue-chartjs"; // We specify what type of chart we want from vue-chartjs and the mixins module
const { reactiveProp } = mixins;

export default {
  extends: Line,
  name: "LineChart",
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        //Chart.js options
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white"
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
                fontColor: "white"
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
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options);
  }
};
</script>