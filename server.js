const express=require('express')
const app=express();

const http=require('http')

const socketio=require('socket.io')
var SerialPort = require("serialport")
var serialPort = new SerialPort('COM6',
{   
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1, 
  flowControl: false
});

const server=http.createServer(app)
const io=socketio(server)

app.use('/',express.static(__dirname+"/frontend"))

var receivedData="";

serialPort.on("open", function () {
  console.log('comm open');
  serialPort.on('data', function(data) {
    receivedData += data.toString();
    console.log("Received data: "+receivedData);
    if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0 ) {
       // save the data between 'B' and 'E'
       if(receivedData.indexOf('E')> receivedData.indexOf('B'))
     {sendData = receivedData.substring(receivedData .indexOf('B') + 1, receivedData.indexOf('E'));
     console.log(sendData);
    }
     receivedData = '';
     }
       // send the incoming data to browser with websockets.
   
  });
});

io.on('connection',(socket)=>{
  console.log('New socket formed from '+socket.id+" client");
  socket.emit('connected');
  socket.emit('update', sendData); 
})

  

server.listen(4000,()=>{
    console.log("server started")
})





