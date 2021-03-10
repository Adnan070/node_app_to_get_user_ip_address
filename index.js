const express = require("express");
const app = express();
var getIP = require("ipware")().get_ip;
const fetch = require('node-fetch');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  var ipInfo = getIP(req);
  console.log(ipInfo);
  req.clientIp = ipInfo.clientIp;
  // { clientIp: '127.0.0.1', clientIpRoutable: false }

  next();
});

app.get("/api", (req, res) => {
  fetch(`https://ipapi.co/${req.clientIp}/json`)
    .then((doc) => (req.userIpInfo = doc))
    .catch((err) => console.log(err));
  res.json({
    ip: req.connection.remoteAddress,
    ipInfo: req.ipInfo,
    userIpInfo: req.userIpInfo,
  });
});
//listen port
app.listen(process.env.PORT || 5000, () => console.log("Connected"));
