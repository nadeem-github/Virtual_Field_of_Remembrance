const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require('express-fileupload');
const fs = require('fs');
const path = require('path');


//Custome Plugins
const config = require("./services/app.service");
const adminRouter = require("./routes/admin.router");
// end 
app.use(fileupload());
//ejs Plugin 
app.engine('html', require('ejs').renderFile);
// end
app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/storage', express.static(__dirname + '/storage'));

//User Routes
app.use("/api/admin", adminRouter);
// throw new Error("🔥 This is a test error to check error_log.txt");
//ng serve --host 0.0.0.0 --port 4200
// simple route
app.get("/", (_req, res) => {
  res.json({ message: "server working..." });
});
// Log unhandled errors to error_log.txt
process.on('uncaughtException', function (err) {
  const logPath = path.join(__dirname, 'error_log.txt');
  const errorMsg = `[${new Date().toISOString()}] Uncaught Exception: ${err.stack}\n`;
  fs.appendFileSync(logPath, errorMsg, 'utf8');
});

process.on('unhandledRejection', function (reason, promise) {
  const logPath = path.join(__dirname, 'error_log.txt');
  const errorMsg = `[${new Date().toISOString()}] Unhandled Rejection: ${reason}\n`;
  fs.appendFileSync(logPath, errorMsg, 'utf8');
});

const PORT = process.env.PORT || config["port"];
let server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
