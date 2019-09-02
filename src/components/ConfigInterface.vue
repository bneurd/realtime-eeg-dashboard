<template>
  <div style="padding-left: 20px; padding-right: 20px;">
    <div class="row">
      <div class="col-1">
        <md-field>
          <label for="units">Data unit</label>
          <md-select v-model="unit">
            <md-option value="uV">Microvolts</md-option>
            <md-option value="V">volts</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="col-3" style="padding-top: 6px;">
        <label class="label">Scale</label>
        <vue-slider :min="scale_min" :max="scale_max" :interval="interval" v-model="scale" />
      </div>
      <div class="col-3" style="padding-top: 6px;">
        <label class="label">PSD Range</label>
        <vue-slider :min="psd_min" :max="psd_max" v-model="psd_range" />
      </div>
      <div class="col-1">
        <md-field>
          <label for="units">Limit framerate</label>
          <md-select v-model="fps">
            <md-option value="60">60</md-option>
            <md-option value="48">48</md-option>
            <md-option value="30">30</md-option>
            <md-option value="20">20</md-option>
            <md-option value="15">15</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  name: "ConfigInterface",
  components: {
    VueSlider
  },
  data() {
    return {
      unit: "uV",
      scale: 4.8,
      psd_range: [0, 64],
      psd_min: 0,
      psd_max: 64,
      scale_min: 0.5,
      scale_max: 6,
      interval: 0.1,
      fps: "60",
    };
  },
  watch: {
    unit: function (unit) {
      this.$emit("unit", unit);
    },
    scale: function (scale) {
      this.$emit("scale", scale);
    },
    psd_range: function (psd_range) {
      this.$emit("psd_range", psd_range)
    },
    fps: function (fps) {
      this.$emit("fps", fps)
    }
  }
};
</script>

<style scoped>
.label {
  /* margin-bottom: -5px; */
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 6px;
}

.range-slider__range {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d7dcdf;
  outline: none;
  padding: 0;
  margin: 0;
}
.range-slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}
.range-slider__range::-webkit-slider-thumb:hover {
  background: #1abc9c;
}
.range-slider__range:active::-webkit-slider-thumb {
  background: #1abc9c;
}
.range-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}
.range-slider__range::-moz-range-thumb:hover {
  background: #1abc9c;
}
.range-slider__range:active::-moz-range-thumb {
  background: #1abc9c;
}

.low .-webkit-slider-thumb {
  background: red;
}

::-moz-range-track {
  background: #d7dcdf;
  border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}
</style>