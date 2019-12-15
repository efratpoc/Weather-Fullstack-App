const tempManager = new TempManager()
const renderer = new Renderer()


const loadPage = async function () {
    let citiesFromDB = await tempManager.getDataFromDB()
    for (let i of tempManager.cityData) {
        $("#cities-container").empty()
        renderer.render(tempManager.cityData)
    }
}

$(document).ready(loadPage())


const handleSearch = async function () {
    let requiredCity = $("#city-search").val()
    let requiredCityAchieved = await tempManager.getCityData(requiredCity)
    for (let i of tempManager.cityData) {
        if (i.name === requiredCityAchieved.name) {
            $("#cities-container").empty()
            renderer.render(tempManager.cityData)
        }
    }
    $("#city-search").val("")
}

$("#container").on("keypress","#city-search", function(event){
    if(event.keyCode === 13){
        event.preventDefault()
        $(".search").click()
    }
})

$("#container").on("click keypress", ".search", function () {
    handleSearch()
})


$("#container").on("click", ".save", async function(){
    let saveThisCity = $(this).closest("div").find("h1").text()
    let savePlease = await tempManager.saveCity(saveThisCity)
    $("#cities-container").empty()
    renderer.render(tempManager.cityData)
})


$("#container").on("click", ".remove", async function(){
    let removeThisCity = $(this).closest("div").find("h1").text()
    let removePlease = await tempManager.removeCity(removeThisCity)
    $("#cities-container").empty()
    renderer.render(tempManager.cityData)
    
})

$("#container").on("click", ".refresh", async function(){
    let updateCity = $(this).closest("div").find("h1").text()
    let updateThisCity = await tempManager.updateCity(updateCity)
    $("#cities-container").empty()
    renderer.render(tempManager.cityData)
})