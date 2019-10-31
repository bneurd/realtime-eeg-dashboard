<template>
  <div>
    <Header :frequency="frequency" :conStatus="conStatus" />
    <div class="container-fluid" style="margin-top: 20px; margin-botton: 20px; width: 100%;">
      <ConfigInterface
        @unit="setUnit"
        @scale="setScale"
        @psd_range="setPsd_range"
        @fps="setFps"
        @band_view_mode="setBandViewMode"
        @pause="setIsStop"
      />
    </div>
    <div class="row width-100">
      <div class="col-sm-7">
        <TimeSeries
          @frequency="setFrequency"
          @dataForOneSec="getDataForOneSec"
          :unit="unit"
          :scale="scale"
          :fps="fps"
          :isStop="isStop"
        />
      </div>
      <div class="col-sm-5">
        <PSD
          :dataForOneSec="dataForOneSec"
          :frequency="frequency"
          :psd_range="psd_range"
          :band_view_mode="band_view_mode"
          :isStop="isStop"
        />
      </div>
    </div>
  </div>
</template>

<style>
body {
  min-height: 100vh;
  background-color: #444 !important;
}
</style>

<script>
import TimeSeries from "@/components/TimeSeries.vue";
import PSD from "@/components/PSD.vue";
import ConfigInterface from "@/components/ConfigInterface.vue";
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    TimeSeries,
    PSD,
    ConfigInterface,
    Header
  },
  data() {
    return {
      conStatus: `<span class="text-danger">disconnected</span>`,
      frequency: 0,
      dataForOneSec: [],
      unit: "uV",
      scale: 4.8,
      fps: "60",
      psd_range: [0, 64],
      band_view_mode: "each",
      isStop: false
    };
  },
  sockets: {
    connect() {
      this.conStatus = `connected`;
    },

    disconnect() {
      this.conStatus = `disconnected`;
    }
  },
  methods: {
    setFrequency(value) {
      this.frequency = value;
    },

    getDataForOneSec(value) {
      this.dataForOneSec = value;
    },

    setUnit(value) {
      this.unit = value;
    },

    setScale(value) {
      this.scale = value;
    },

    setPsd_range(value) {
      this.psd_range = value;
    },

    setFps(value) {
      this.fps = value;
    },
    setIsStop(value) {
      this.isStop = value;
    },
    setBandViewMode(value) {
      this.band_view_mode = value;
    }
  }
};
</script>