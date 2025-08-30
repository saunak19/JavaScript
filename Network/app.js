const os = require("os");

function getRouterIP() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        // Usually first 3 parts + .1 is router IP
        return net.address.split(".").slice(0, 3).join(".") + ".1";
      }
    }
  }
}

console.log("Router IP might be:", getRouterIP());
