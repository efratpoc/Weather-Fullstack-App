const mongoose = require("mongoose")
const Schema = mongoose.Schema
// const moment = require("moment")

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
    humidity: Number,
    sunrise: String,
    sunset: String,
    isSaved: Boolean
})


let City = mongoose.model("city", citySchema)

module.exports = City