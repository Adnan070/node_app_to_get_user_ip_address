const express = require("express");
const app = express();
var getIP = require("ipware")().get_ip;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  var ipInfo = getIP(req);
  console.log(ipInfo);
  req.ipInfo = ipInfo;
  // { clientIp: '127.0.0.1', clientIpRoutable: false }
  next();
});

app.get("/api", (req, res) => {
  res.json({
    ip: req.connection.remoteAddress,
    ipInfo: req.ipInfo,
  });
});
//listen port
app.listen(process.env.PORT || 5000, () => console.log("Connected"));
