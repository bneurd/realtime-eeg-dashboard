<script>
import { Bar, mixins } from "vue-chartjs"; // We specify what type of chart we want from vue-chartjs and the mixins module
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  name: "BarChart",
  mixins: [reactiveProp],
  data() {
    return {
      options: {
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
        animation: {
          duration: 400
        },
        legend: {
          display: false
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