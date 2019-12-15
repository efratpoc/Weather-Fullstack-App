class Renderer{

    _renderData(allCityData){
        const source = $("#new-city-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({allCityData})
        $("#cities-container").append(newHTML)
    }
    async render(allCityData){
        await this._renderData(allCityData)
    }
}

