<script>
import { Bar, mixins } from "vue-chartjs"; // We specify what type of chart we want from vue-chartjs and the mixins module
import {getBarChartJsDefaults} from "../utils/ChartOptions"
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  name: "BarChart",
  mixins: [reactiveProp],
  data() {
    return {
      options: getBarChartJsDefaults()
    };
  },
  mounted() {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options);
  }
};
</script>