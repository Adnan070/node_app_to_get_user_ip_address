const express = require("express");
const app = express();

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
  });
});
//listen port
app.listen(process.env.PORT, () => console.log("Connected"));
