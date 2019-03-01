// Require the serialport node module
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const Delimiter = require("@serialport/parser-delimiter");

// Open the port
var port = new SerialPort("/dev/tty.usbserial-AL02K9OD", {
  baudRate: 9600
});

const parser = port.pipe(new Delimiter({ delimiter: "\n" }));

parser.on("data", console.log);

// Read the port data
port.on("open", function() {
  console.log("open");

  port.on("data", function(data) {
    console.log("here", data, data.toString("utf8"));
    // parser.on("data", line => console.log(`> ${line}`));
  });
});
