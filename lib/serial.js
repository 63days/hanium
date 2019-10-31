const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const port = new SerialPort('COM3', {
    baudRate: 115200,
    //    parser: SerialPort.parsers.readline("\n")
})
const parser = port.pipe(new Delimiter({
    delimiter: ','
}))

var rawbattery = 0,
    battery = 0,
    solarTracker = 0;
var parsingData = function (data) {
    var str = data.toString();
    for (var i = 0; i < str.length; i++) {
        if (str[i] == 'T') {
            const substr = str[i + 1]
            solarTracker = parseInt(substr, 10);
        }
        if (str[i] == 'b') {
            const substr = str[i + 1] + str[i + 2] + str[i + 3] + str[i + 4];
            rawbattery = parseFloat(substr, 10);
            battery = Math.round(((rawbattery * 3.3 / 4095) - 1.0) * 100 / 1.4) //minus 1.0 -> 2.3
        }
    }
    console.log('raw: ', rawbattery, 'battery:', battery);
    console.log('solarTracker:', solarTracker);
    console.log('' + data);
}