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
import { getChartSmoothieDefaults } from "@/utils/ChartOptions.js";
import { COLORS } from "@/utils/Colors";

var $ = require("jquery");

export default {
  name: "TimeSeries",
  data() {
    return {
      charts: [],
      series: [],
      dataToEmitTemplate: [],
      dataToEmit: [],
      firtsPkg: true,
      channels: []
    };
  },
  sockets: {
    eeg(dataStr) {
      let data = JSON.parse(dataStr);
      if (this.firtsPkg) {
        console.log(data);
        this.channels = data.channels;
        this.firtsPkg = false;
        this.initGraph();
      }
      this.series.forEach((serie, idx) => {
        serie.append(Date.now(), data.eeg[idx]);
        this.dataToEmit[idx].push(data.eeg[idx]);
      });
      this.$emit("frequency", data.fs);
      if (this.dataToEmit[0].length === data.fs) {
        this.$emit("dataForOneSec", this.dataToEmit);
        this.dataToEmit = this.dataToEmit.map(_data => [])
      }
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

        // createDataToEmitTemplate
        this.dataToEmitTemplate.push([])

        // render chart
        this.charts[idx].streamTo(canvas);
      });
      this.dataToEmit = [...this.dataToEmitTemplate]
    }
  }
};
</script>