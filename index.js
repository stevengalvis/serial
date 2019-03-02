// Require the serialport node module
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const Delimiter = require("@serialport/parser-delimiter");

// Open the port
var port = new SerialPort("/dev/tty.usbserial-AL02K9OD", {
  baudRate: 115200
});

// Read the port data
port.on("open", function() {
  console.log("open");

  port.write("S");
  port.write("I");
  port.write("\r");
  port.write("\n");

  port.on("data", function(data) {
    console.log("here", data, data.toString("utf8"));
  });
});
