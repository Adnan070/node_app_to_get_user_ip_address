const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    ip: req.ip,
  });
});

app.listen(process.env.PORT, () => console.log("Connected"));
