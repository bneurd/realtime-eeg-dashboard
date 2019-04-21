<template>
  <div id="channels"></div>
</template>

<style>
.channel-name {
  text-align: right;
  color: #fff;
  font-weight: bold;
  margin: auto;
}

canvas {
  border: solid 1px #333;
}
</style>

<script>
import { SmoothieChart, TimeSeries } from "smoothie";
import { getChartSmoothieDefaults } from "@/utils/ChartOptions.js";
import { COLORS } from "@/utils/Colors";
var $ = require("jquery");

export default {
  name: "TimeSeries",
  data() {
    return {
      charts: [],
      series: [],
      firtsPkg: true,
      channels: []
    };
  },
  sockets: {
    eeg(dataStr) {
      let data = JSON.parse(dataStr);
      if (this.firtsPkg) {
        this.channels = data.channels;
        this.firtsPkg = false;
        console.log(data);
        this.initGraph();
      }
      this.series.forEach((serie, idx) => {
        serie.append(Date.now(), data.eeg[0][idx]);
      });
      this.$emit("frequency", data.fs);
    }
  },
  methods: {
    initGraph() {
      // console.log(this.channels)
      this.channels.forEach((channel, idx) => {
        // Add chart element
        $("#channels").append(`
        <div class="row" style="width:100%;">
          <div class="col-1 channel-name">
            ${channel}
          </div>
          <div class="col-11">
            <canvas id="${channel}" style="width:100%; height:90px"></canvas>
          </div>
        </div>`);

        // get chart element
        const canvas = document.getElementById(channel);

        // Create chart
        this.charts.push(new SmoothieChart(getChartSmoothieDefaults()));

        // create time serie
        this.series.push(new TimeSeries());

        // add time serie
        this.charts[idx].addTimeSeries(this.series[idx], {
          strokeStyle: COLORS[idx]
        });

        // render chart
        this.charts[idx].streamTo(canvas);
      });
    }
  }
};
</script>