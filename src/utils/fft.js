import fftjs from "fft.js";

var fftCache = {};

export function fft(signal, options) {
	var {fftSize, truncate} = Object.assign({
		fftSize: Math.pow(2, nextpow2(signal.length)),
	}, options);

	var f;
	if (fftCache.hasOwnProperty(fftSize)) {
		f = fftCache[fftSize];
	} else {
		f = new fftjs(fftSize);
		fftCache[fftSize] = f;
	}

	// Zero pad signal to length if needed
	if (signal.length < fftSize) {
		signal = signal.concat(Array(fftSize - signal.length).fill(0));
	}

	var freqs = f.createComplexArray();
    f.realTransform(freqs, signal);
	// if(truncate){
	var powers = getPowers(freqs, freqs.length / 2);
	// }else{
	// 	var powers = getPowers(freqs, freqs.length);
	// }

	return powers;
}

function getPowers(complexArray, length) {
	var magnitudes = [];
	for (var i = 0; i < length - 1; i += 2) {
		magnitudes.push(Math.abs(complexArray[i]    ));
	}
	return magnitudes;
}

function nextpow2(num) {
  return Math.ceil(Math.log2(Math.abs(num)));
}
