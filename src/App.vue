<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">BCPY</span>
      <span class="navbar-text element-center">
        status:
        <span id="con-status" class="font-weight-bold" v-html="conStatus"></span>
      </span>
      <span class="navbar-text element-right">
        frequency:
        <span id="frequency" class="font-weight-bold">{{frequency}}</span>
      </span>
    </nav>
    <div class="row width-100">
      <div class="col-sm-7">
        <TimeSeries @frequency="setFrequency"  @dataForOneSec="getDataForOneSec" />
      </div>
      <div class="col-sm-5">
        <PSD :dataForOneSec=dataForOneSec />
      </div>
    </div>
  </div>
</template>

<style>
.element-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.width-100 {
  width: 100%;
}

body {
  min-height: 100vh;
  background-color: #444 !important;
}

.element-right {
  position: absolute;
  width: 10%;
  right: 1%;
}

nav {
  margin-bottom: 20px;
}
</style>

<script>
import TimeSeries from "@/components/TimeSeries.vue";
import PSD from "@/components/PSD.vue";
export default {
  name: "App",
  components: {
    TimeSeries,
    PSD,
  },
  data() {
    return {
      conStatus: `<span class="text-danger">disconnected</span>`,
      frequency: 0,
      dataForOneSec: [],
    };
  },
  sockets: {
    connect() {
      this.conStatus = `<span class="text-success">connected</span>`;
    },

    disconnect() {
      this.conStatus = `<span class="text-danger">disconnected</span>`;
    }
  },
  methods: {
    setFrequency(value) {
      this.frequency = value;
    },

    getDataForOneSec(value) {
      this.dataForOneSec = value;
    }
  }
};
</script>