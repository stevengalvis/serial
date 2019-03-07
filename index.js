// Require the serialport node module
const SerialPort = require("serialport");

// Open the port
var port = new SerialPort("/dev/tty.usbserial-AL02K9OD", {
  baudRate: 115200,
  parser: new SerialPort.parsers.Readline("\n")
});

port.on("open", function() {
  console.log("open");
});
let readTicks = 0;

function readInterval() {
  port.write("S");
  port.write("x");
  port.write("1");
  port.write("\r");
  port.write("\n");

  port.on("readable", function() {
    console.log(`Seconds ${readTicks} Data:`, port.read().toString("utf8"));
  });

  readTicks++;
}
setInterval(readInterval, 1000);
setInterval(getStream);

function getStream() {
  port.write("S");
  port.write("x");
  port.write("1");
  port.write("\r");
  port.write("\n");

  port.on("data", function(data) {
    let dt = new Date();

    console.log(`${dt.toUTCString()} ${data.toString("utf8")}`);
  });
}
