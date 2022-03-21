const express = require("express");

const getData = require("./getData");

require("dotenv").config();

const { PORT } = process.env;
const port = PORT || 8000;

getData();
setInterval(getData, 12000);

const app = express();

app.listen(port, () => console.log(`Scrapper running on PORT: ${port}`));
