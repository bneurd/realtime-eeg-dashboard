import { getColor } from "./Colors";
import bci from "bcijs";
import { fft } from "./fft";

export const getChartsData = (channels, frequency) => {
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
    
    let powers = bci.signalBandPower(channel, frequency, [
      "alpha",
      "beta",
      "delta",
      "theta",
      "gamma"
    ]);
    // powers = powers.map(x => 10 * Math.log2(x))
    alpha.push(powers[0]);
    beta.push(powers[1]);
    delta.push(powers[2]);
    theta.push(powers[3]);
    gamma.push(powers[4]);
    return {
      data: psd,
      fill: false,
      borderColor: getColor(idx),
      borderWidth: 1,
      pointRadius: 0
    };
  });

  return [datasets, { alpha, beta, delta, theta, gamma }];
};
