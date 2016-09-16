var McpAdc = require ('mcp-adc');

var adc = new McpAdc.Mcp3208();

var channel = 0;

adc.readRawValue(channel, function(value) {
		console.log('Raw value: \t' + value);
});

adc.readVoltage(channel, function(voltage){
		console.log("Voltage: \t" + voltage);
	});
	

adc.readNormalizedValue(channel, function(normValue){
		console.log("Percents: \t" + (normValue*100));
	});
