const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const api = require("./server/routes/api")
const mongoose = require("mongoose")
const request = require("request")
const path = require("path")
const port = 3006

mongoose.connect("mongodb://localhost/weatherDB", { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/", api)

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, 'node_modules')))



app.listen(port, function(){
    console.log(`Running on port ${port}`)
})