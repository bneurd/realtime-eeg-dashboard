export const offsetSignal = (amplitude, channelNumber, channelAmount = 8, unit = "uV", scale = 4.8) => {
    if (unit == "uV")
        amplitude = amplitude / 1000000;
    let scaledAmplitude = amplitude * Math.pow(10, scale);
    let offset = 2 * (channelAmount - channelNumber) - 1;

    return parseFloat(scaledAmplitude + offset);
}

export const voltsToMicrovolts = (volts, log) => {
    if (!Array.isArray(volts)) {
        volts = [volts];
    }
    return volts.map((volt) => {
        return log ? Math.log10(Math.pow(10, 6) * volt) : Math.pow(10, 6) * volt;
    });
}