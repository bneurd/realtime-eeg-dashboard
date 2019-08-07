<template>
  <div>
    <div class="margin-bottom">
      <LineChart class="psd-chart" :chart-data="psdData" :options="chartOptions"/>
    </div>
    <BarChart class="psd-chart" :chart-data="bandPowerData"/>
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
import { COLORS } from "@/utils/Colors";
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
      chartOptions: getLineChartJsDefaults(),
    };
  },
  props: {
    dataForOneSec: Array,
    frequency: Number,
    psd_range: Array
  },
  watch: {
    dataForOneSec: function(channels) {
      let alpha = [];
      let beta = [];
      let delta = [];
      let theta = [];
      let gamma = [];

      const datasets = channels.map((channel, idx) => {
        const psd = bci.psd(channel, {
          fftSize: 128,
          truncate: true
        });
        const powers = bci.signalBandPower(channel, this.frequency, [
          "alpha",
          "beta",
          "delta",
          "theta",
          "gamma"
        ]);
        alpha.push(powers[0]);
        beta.push(powers[1]);
        delta.push(powers[2]);
        theta.push(powers[3]);
        gamma.push(powers[4]);
        return {
          data: psd,
          fill: false,
          borderColor: COLORS[idx],
          borderWidth: 1,
          pointRadius: 0
        };
      });

      this.psdData = {
        datasets,
        labels: datasets[0].data.map((_v, id) => id)
      };

      this.bandPowerData = {
        labels: ["alpha", "beta", "delta", "theta", "gamma"],
        datasets: channels.map((channel, idx) => ({
          backgroundColor: COLORS[idx],
          data: [alpha[idx], beta[idx], delta[idx], theta[idx], gamma[idx]]
        }))
      };
    },
    psd_range: function(value) {
      this.chartOptions = getLineChartJsDefaults(value[0], value[1])
    }
  },
  methods: {}
};
</script>