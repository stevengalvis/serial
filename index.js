// Require the serialport node module
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const Delimiter = require("@serialport/parser-delimiter");

// Open the port
var port = new SerialPort("/dev/tty.usbserial-AL02K9OD", {
  baudRate: 115200,
  parser: new SerialPort.parsers.Readline("\n")
});

// // Read the port data
// port.on("open", function() {
//   console.log("open");
//
//   // port.write("S");
//   // port.write("I");
//   setInterval(read, 1000);
//
//   function read() {
//     port.write("S");
//     port.write("x");
//     port.write("1");
//     port.write("\r");
//     port.write("\n");
//     port.on("data", function(data) {
//       console.log(`here`, data, data.toString("utf8"));
//     });
//   }
// });
//Read the port data
port.on("open", function() {
  console.log("open");

  // setInterval(readInterval, 1000);
  let x = 0;

  for (let i = 1; i > x; i++) {
    getStream();
  }
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

function getStream() {
  port.write("S");
  port.write("x");
  port.write("1");
  port.write("\r");
  port.write("\n");

  port.on("data", function(data) {
    let dt = new Date();

    let line = `${dt.toUTCString()} ${data.toString("utf8")}`;
    // let line = `data ticks ${tick} ${Date.now()} ${data.toString("utf8")}`;
    console.log(line);
  });
}
