// Importing required packages
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const axios = require("axios");

app = express();
  
// Setting a cron job
cron.schedule("* * * * *", async function() {
  
    // Data to write on file
    let data = await axios.get('https://covidrescue.co.in/api/check-send-notification');

    console.log(data.status.toString(), " ", JSON.stringify(data.data))
    console.log('hello', new Date().toString())
});
  
app.listen(3001);