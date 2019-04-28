<template>
  <div>
    <LineChart class="psd-chart" :chart-data="psdData"/>
  </div>
</template>

<style>
.psd-chart {
	background-color: #555;
}
</style>


<script>
import LineChart from "@/components/LineChart.vue";
import bci from "bcijs";
import { COLORS } from "@/utils/Colors";

export default {
  name: "PSD",
  components: {
    LineChart
  },
  data() {
    return {
      psdData: {}
    };
  },
  props: {
    dataForOneSec: Array
  },
  watch: {
    dataForOneSec: function(channels) {
      const datasets = channels.map((channel, idx) => {
        const psd = bci.psd(channel, {fftSize: 128});
        return {
          data: psd,
					fill: false,
					borderColor: COLORS[idx],
					borderWidth: 1,
					pointRadius: 0,
        };
      });
      this.psdData = {
        datasets,
        labels: datasets[0].data.map((_v, id) => id)
      };
    }
  },
  methods: {}
};
</script>