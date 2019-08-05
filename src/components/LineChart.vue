<script>
import { Line, mixins } from "vue-chartjs"; // We specify what type of chart we want from vue-chartjs and the mixins module
const { reactiveProp } = mixins;

export default {
  extends: Line,
  name: "LineChart",
  props: ["options", "chartData"],
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
     watch: {
     options () {
        this.renderChart(this.chartData, this.options);
     }
   }
};
</script>