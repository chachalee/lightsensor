var mcpadc = require('mcp-spi-adc');

var lightSensor = mcpadc.open(0, {speedHz: 20000}, function (err) {
  if (err) throw err;

  setInterval(function () {
    lightSensor.read(function (err, reading) {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});