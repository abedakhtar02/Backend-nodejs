const express = require("express");
const urlModel = require("./models/url");
const urlRoute = require("./routes/url");
const { connectMongoDb } = require("./connect");

const PORT = 8001;
const app = express();
connectMongoDb("mongodb://localhost:27017/short-url")
.then(() =>
  console.log("Mongodb connected!")
);

app.use(express.json());
app.use("/url", urlRoute);


app.listen(PORT, () => console.log("Server started!"));
