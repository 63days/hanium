module.exports.parseData   = function (data) {
    var str = data.toString();
    var rawbattery = 0,
        battery = 0,
        solarTracker = 0,
        gimbal;
    
    for (var i = 0; i < str.length; i++) {
        if (str[i] == 'T') {
            const substr = str[i + 1]
            solarTracker = parseInt(substr, 10);
        }
        if (str[i] == 'b') {
            const substr = str[i + 1] + str[i + 2] + str[i + 3] + str[i + 4];
            rawbattery = parseFloat(substr, 10);
            battery = Math.round(((rawbattery * 3.3 / 4095) - 2.3) * 100 / 1.5) //minus 1.0 -> 2.3
        }
        if(str[i] == 'G') {
            const substr = str[i+1];
            gimbal = parseInt(substr, 10);
        }
    }
    console.log('raw: ', rawbattery, 'battery: ', battery, 'solarTracker: ', solarTracker, 'gimbal: ', gimbal);
    console.log('' + data);
    return {'battery': battery, 'solarTracker': solarTracker, 'gimbal': gimbal};
}