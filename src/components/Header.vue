<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <span class="navbar-brand mb-0 h1">BCPY</span>
    <span class="navbar-text element-center">
      status:
      <span id="con-status" class="font-weight-bold" v-html="conElement"></span>
    </span>
    <span class="navbar-text element-right">
      frequency:
      <span id="frequency" class="font-weight-bold">{{frequency}}</span>
      <button class="pause-btn" v-on:click="pause" v-if="!isStop"><md-icon>pause</md-icon></button>
      <button class="pause-btn" v-on:click="pause" v-else><md-icon>play_arrow</md-icon></button>
    </span>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      conElement: `<span class="text-danger">disconnected</span>`,
      isStop: false
    };
  },
  props: {
    frequency: Number,
    conStatus: String
  },
  methods: {
    pause() {
      this.isStop = !this.isStop;
      this.$emit("pause", this.isStop);
    }
  },
  watch: {
    conStatus: function(value) {
      console.log(value);
      if (value === "connected")
        this.conElement = `<span class="text-success">connected</span>`;
      else this.conElement = `<span class="text-danger">disconnected</span>`;
    }
  }
};
</script>

<style scoped>
.pause-btn {
  margin-left: 15px;
  background-color: transparent;
  border: none;
}

.element-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.width-100 {
  width: 100%;
}

.element-right {
  position: absolute;
  /* width: 10%; */
  right: 1%;
}

nav {
  margin-bottom: 20px;
}
</style>