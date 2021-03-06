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
      powers: {},
      psdData: {},
      bandPowerData: {},
      chartOptions: getLineChartJsDefaults()
    };
  },
  props: {
    dataForOneSec: Array,
    frequency: Number,
    psd_range: Array,
    band_view_mode: String,
    isStop: Boolean,
  },
  watch: {
    dataForOneSec: function(channels) {
      if (this.isStop) return;
      const [datasets, powers] = getChartsData(channels, this.frequency);

      this.setPSDGraphData(datasets);
      this.setPowerGraphData(powers);
    },
    psd_range: function(value) {
      this.chartOptions = getLineChartJsDefaults(value[0], value[1]);
    },
    band_view_mode: function(value) {
      if (value === "each") {
        return this.setPowerGraphForEachChannel(this.powers);
      }
      this.setPowerGraphAverage(this.powers)
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
      this.powers = powers;
      if (this.band_view_mode === "each") {
        return this.setPowerGraphForEachChannel(powers);
      }
      this.setPowerGraphAverage(powers)
    },

    setPowerGraphForEachChannel(powers) {
      this.bandPowerData = {
        labels: ["delta", "theta", "alpha", "beta", "gamma"],
        datasets: powers.alpha.map((_, idx) => ({
          backgroundColor: getColor(idx),
          data: [
            powers.delta[idx],
            powers.theta[idx],
            powers.alpha[idx],
            powers.beta[idx],
            powers.gamma[idx]
          ]
        }))
      };
    },

    setPowerGraphAverage(powers) {
      const numOfChannels = powers.alpha.length
      this.bandPowerData = {
        labels: ["delta", "theta", "alpha", "beta", "gamma"],
        datasets: [{
          backgroundColor: getColor(0),
          data: [
            powers.delta.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.theta.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.alpha.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.beta.reduce((a, b) => a+b, 0) / numOfChannels,
            powers.gamma.reduce((a, b) => a+b, 0) / numOfChannels
          ]
        }]
      };
    }
  }
};
</script>