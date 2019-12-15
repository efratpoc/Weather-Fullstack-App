const express = require("express")
const router = express()
const weatherAPIKey = "f2112d158fda29132b3be27bd3c4229c"
const request = require("request")
const mongoose = require("mongoose")
const moment = require("moment")

//requiring all the models here!
const City = require("../model/city")

const json = {
    data: {}
}

//connecting to external API
router.get("/city/:cityName", function (req, res) {
    const cityName = req.params.cityName
    request.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}&units=metric`, function (error, response) {
        res.send(JSON.parse(response.body))
    })
})

//connecting to DB - getting saved cities
router.get("/cities", async function (req, res) {
    const cities = await City.find({})
    res.send(cities)
    // City.find({}, function(error, response){
    //     res.send(response)
    // })
})

//connecting to DB - saving a new city
router.post("/city", function (req, res) {
    const newCity = new City(req.body)
    City.findOne({ name: newCity.name }, function (error, success) {
        if (success) {
            return
        } else {
            newCity.isSaved = true
            newCity.save()

        }
        res.send(newCity)
    })

})

router.put("/city/:cityName", async function (req, res) {
    let cityName = req.params.cityName
    request.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}&units=metric`, function (error, response) {
        res.send(JSON.parse(response.body))
        
    })

})

//connecting to DB - deleting a city
router.delete("/city/:cityName", async function (req, res) {
    const cityName = req.params.cityName
    let success = await City.deleteOne({ name: cityName })
    res.end()

})

router.delete("/deleteAll", async function (req, res) {
    await City.deleteMany({})
    res.end()
})


module.exports = router