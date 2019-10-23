<template>
  <div>
    <div class="margin-bottom">
      <LineChart class="psd-chart" :chart-data="psdData" :options="chartOptions" />
    </div>
    <BarChart class="psd-chart" :chart-data="bandPowerData" />
  </div>
</template>

<style>
.psd-chart {
  background-color: #555;
}

.margin-bottom {
  margin-bottom: 15px;
}
</style>


<script>
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import bci from "bcijs";
import { getColor } from "../utils/Colors";
import { getChartsData } from "../utils/Data";
import { getLineChartJsDefaults } from "@/utils/ChartOptions.js";

export default {
  name: "PSD",
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      psdData: {},
      bandPowerData: {},
      chartOptions: getLineChartJsDefaults()
    };
  },
  props: {
    dataForOneSec: Array,
    frequency: Number,
    psd_range: Array,
    band_view_mode: String
  },
  watch: {
    dataForOneSec: function(channels) {
      const [datasets, powers] = getChartsData(channels, this.frequency);

      this.setPSDGraphData(datasets);
      this.setPowerGraphData(powers);
    },
    psd_range: function(value) {
      this.chartOptions = getLineChartJsDefaults(value[0], value[1]);
    }
  },
  methods: {
    setPSDGraphData(datasets) {
      this.psdData = {
        datasets,
        labels: datasets[0].data.map((_, frequency) => frequency)
      };
    },
    setPowerGraphData(powers) {
      if (this.band_view_mode === "each") {
        return this.setPowerGraphForEachChannel(powers);
      }
      this.setPowerGraphAverage(powers)
    },

    setPowerGraphForEachChannel(powers) {
      this.bandPowerData = {
        labels: ["alpha", "beta", "delta", "theta", "gamma"],
        datasets: powers.alpha.map((_, idx) => ({
          backgroundColor: getColor(idx),
          data: [
            powers.alpha[idx],
            powers.beta[idx],
            powers.delta[idx],
            powers.theta[idx],
            powers.gamma[idx]
          ]
        }))
      };
    },

    setPowerGraphAverage(powers) {
      const numOfChannels = powers.alpha.length
      this.bandPowerData = {
        labels: ["alpha", "beta", "delta", "theta", "gamma"],
        datasets: [{
          backgroundColor: getColor(0),
          data: [
            powers.alpha.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.beta.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.delta.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.theta.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.gamma.reduce((a, b) => a+b, 0) / numOfChannels
          ]
        }]
      };
    }
  }
};
</script>