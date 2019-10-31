const http = require('http'),
      express = require('express'),
      path = require('path'),
      static = require('serve-static');

const ejs = require('ejs');

const myFunc = require('./lib/myFunc.js');

const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const port = new SerialPort('COM6', {   baudRate: 19200    })
const parser = port.pipe(new Delimiter({    delimiter: ','  }))

const ioHook = require('iohook');
ioHook.on('keydown', event => {
    var key = event.keycode;
    if (key == 17) {
        port.write('w');
    } else if (key == 30) {
        port.write('a');
    } else if (key == 31) {
        port.write('s');
    } else if (key == 32) {
        port.write('d');
    } else if (key == 36) {
        port.write('j');
    } else if (key == 37) {
        port.write('k');
    } else if (key == 45) {
        port.write('x');
    }
});
ioHook.start();

var app = express();

app.set("view engine", 'ejs');

//app.set('port', process.env.PORT || 6363);
app.set('port', 6363);
app.use('/test', static(path.join(__dirname, 'test')));
app.use('/image', static(path.join(__dirname, 'image')));
app.use('/views', static(path.join(__dirname, 'views')));

app.use('/', function (req, res) {
    res.render('templateHTML', {})
});

var server = http.createServer(app);

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    parser.on('data', function (data) {
        var temp = myFunc.parseData(data);
        socket.emit('battery', temp.battery);
        socket.emit('solarTracker', temp.solarTracker);
        socket.emit('gimbal', temp.gimbal);
    });
    
    socket.on('rasp', (data) => {
        port.write(data);
    })
    socket.on('disconnect', (data) => {
        console.log('disconnect');
    })
});

server.listen(app.get('port'), function () {
    console.log('server start at:'+app.get('port'));
})