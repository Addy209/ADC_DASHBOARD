const express = require("express");
const https = require("https");
const next = require("next");
const path = require("path");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "prod";
const PORT = 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    // const sslServer=https.createServer({
    //     key:fs.readFileSync(path.join(__dirname,"cert", "key.pem")),
    //     cert:fs.readFileSync(path.join(__dirname, "cert", "cert.pem"))
    // }, server)
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log("Server Ready at port " + PORT);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

//"next dev",
