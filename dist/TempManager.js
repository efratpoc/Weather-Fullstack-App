
class TempManager {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        await $.get('/cities', function (request, response) {
            if (response != []) {
                tempManager.cityData = request
                return tempManager.cityData
            }
        })
    }

    async getCityData(cityName) {
        try {
            let result = await $.get(`/city/${cityName}`)
            let resultCity = {
                name: result.name,
                temperature: result.main.temp,
                condition: result.weather[0].main,
                conditionPic: `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
                humidity: result.main.humidity,
                sunrise: moment.unix(result.sys.sunrise).format("LT"),
                sunset: moment.unix(result.sys.sunset).format("LT"),
                isSaved: false,
            }
            this.cityData.push(resultCity)
            return resultCity
        } catch (error) {
            console.log(error)
        }

    }

    async saveCity(cityName) {
        const cityToLookUp = this.cityData.find(c => c.name == cityName)
        let bla = await $.post(`/city`, cityToLookUp )
        this.cityData.find(c => c.name == cityName).isSaved = true
    }

   async removeCity(cityName){
        await $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function(request, response){
                
                // console.log(response + request)
            },
            error: function(xhr, text, error){
                console.log(error + text)
            }
        })
        this.cityData.find(c => c.name == cityName).isSaved = false
    }

    async updateCity(cityName){
        $.ajax({
            url: `/city/${cityName}`,
            method: "PUT",
            success: function(request, response){
                let updatedCity = {
                    name: request.name,
                    temperature: request.main.temp,
                    condition: request.weather[0].main,
                    conditionPic: `http://openweathermap.org/img/wn/${request.weather[0].icon}@2x.png`,
                    humidity: request.main.humidity,
                    sunrise: moment.unix(request.sys.sunrise).format("LT"),
                    sunset: moment.unix(request.sys.sunset).format("LT"),
                    isSaved: false
                }
                console.log(tempManager.cityData)
                console.log(updatedCity)
                
            },
            error: function(xhr, text, error){
                console.log(error + text)
            }

        })
    }

}




