<template>
  <div class="row">
    <div class="col-1">
      <div v-for="channel in channels" class="align-div" :key="channel">
        <span class="align-to-graph">{{channel}}</span>
      </div>
    </div>
    <div class="col-11">
      <canvas
        id="time-series"
        style="width:100%;"
        v-bind:style="{ height: 100 * channels.length + 'px' }"
      ></canvas>
    </div>
  </div>
</template>

<style>
.align-div {
  text-align: center;
  color: #fff;
  font-weight: bold;
  height: 100px;
  position: relative;
}

.align-to-graph {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

canvas {
  border: solid 1px #333;
}
</style>

<script>
import { SmoothieChart, TimeSeries } from "smoothie";
import { getChartSmoothieDefaults } from "@/utils/ChartOptions.js";
import { getColor } from "../utils/Colors";
import Config from "@/utils/Config";
import { offsetSignal } from "@/utils/Signal";

export default {
  name: "TimeSeries",
  data() {
    return {
      charts: [],
      series: [],
      dataToEmitTemplate: [],
      dataToEmit: [],
      firtsPkg: true,
      channels: [],
      data: []
    };
  },
  props: {
    unit: String,
    scale: Number,
    fps: String,
  },
  watch: {
    fps: function (fps) {
      this.charts.options.limitFPS = fps;
    }
  },
  sockets: {
    disconnect() {
      this.firtsPkg = false;
    },

    eeg(dataStr) {
      let data = JSON.parse(dataStr);
      if (this.firtsPkg) {
        this.channels = data.channels;
        this.firtsPkg = false;
        this.initGraph();
      }
      this.updateChart(data);

      const updateRate = Math.round(data.fs / 8);
      this.$emit("frequency", data.fs);
      if (this.dataToEmit[0].length === data.fs * 3) {
        this.$emit("dataForOneSec", this.dataToEmit);
      } else if (this.dataToEmit[0].length == data.fs * 3 + updateRate) {
        for (let i = 0; i < updateRate; i++) {
          this.dataToEmit.forEach(channel => {
            channel.shift();
          });
        }
        this.$emit("dataForOneSec", this.dataToEmit);
      }
    }
  },
  methods: {
    initGraph() {
      // get chart element
      const canvas = document.getElementById("time-series");

      // Create chart
      this.charts = new SmoothieChart(
        getChartSmoothieDefaults(this.channels.length)
      );

      this.channels.forEach((channel, idx) => {
        // create time serie
        this.series.push(new TimeSeries());

        // add time serie
        this.charts.addTimeSeries(this.series[idx], {
          strokeStyle: getColor(idx)
        });

        // createDataToEmitTemplate
        this.dataToEmitTemplate.push([]);
      });
      // render chart
      this.charts.streamTo(canvas, 50);
      this.dataToEmit = [...this.dataToEmitTemplate];
      console.log(this.charts.options.limitFPS)
    },

    updateChart(data) {
      this.series.forEach((serie, idx) => {
        serie.append(
          data.timestamp,
          offsetSignal(data.eeg[idx], idx, this.channels.length, this.unit, this.scale)
        );
        this.dataToEmit[idx].push(data.eeg[idx]);
      });
    }
  }
};
</script>