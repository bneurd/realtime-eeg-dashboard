<template>
  <div>
    <h1>PSD</h1>
  </div>
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
export default {
  name: "PSD",
  data() {
    return {};
  },
  props: {
    dataForOneSec: Array,
  },
  watch: {
      dataForOneSec: (newValue) => {
          console.log(newValue.length)
      }
  },
  methods: {}
};
</script>