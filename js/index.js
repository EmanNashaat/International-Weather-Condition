let weekArr = ["sunday" , "Monday" , "Tuesday" , 'Wednesday' , 'Thursday', 'Friday', 'Saturday'];
let defaultAPI = "https://api.weatherapi.com/v1/forecast.json?key=01cec59779c249a7aca105056232002&q=cairo&days=3"
async function getWeather(api = defaultAPI){
    let response = await fetch(api)
    let finalResponse = await response.json()
    // console.log(finalResponse);
    
    // Today 

    // Date month and day
    let date = new Date(finalResponse.location.localtime);
    let finalMonth = date.getMonth() ;
    let finalDay = date.getDate() ;
    let monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"] ;
    function monthFinal(m){
        document.getElementById("todayDate").innerHTML = finalDay + " "+ monthNames[m] ;
    }
    monthFinal(finalMonth);

    // Day Name
    let finalDate = date.getDay() ;
    function dateFinal(d){
        document.getElementById("todayDay").innerHTML = weekArr[d] ;
    }
    dateFinal(finalDate);

    // Today weather
    document.getElementById("countryName").innerHTML = finalResponse.location.name ;
    document.getElementById("weatherTemp").innerHTML = finalResponse.current.temp_c + " ْc" ;
    let weatherI = finalResponse.current.condition.icon;
    let weatherIcon = "https:" + weatherI ;
    document.getElementById("weatherIcon").innerHTML = `<img src="${weatherIcon}" class="w-100" >` ; 
    document.getElementById("weatherCond").innerHTML = finalResponse.current.condition.text

    // getSecondday tommorow

    let date2 = new Date( finalResponse.forecast.forecastday[1].date );
    let finaldate2 = date2.getDay() 
    function date2Final(d2){
        document.getElementById("tomorrowDate").innerHTML = weekArr[d2] ;
    }
    date2Final(finaldate2)
    let finalTommorow = finalResponse.forecast.forecastday[1] ;
    document.getElementById("tommorowIcon").innerHTML = `<img src="https:${finalTommorow.day.condition.icon}">`;
    document.getElementById("tommorowMorningTemp").innerHTML = finalTommorow.day.maxtemp_c + "<sup>o</sup>c" ;
    document.getElementById("tommorowNightTemp").innerHTML = finalTommorow.day.mintemp_c + "<sup>o</sup> " ;
    document.getElementById("tommorowCustom").innerHTML = finalTommorow.day.condition.text ;
    
    // getThirdday AfterTommorow
    let date3 = new Date( finalResponse.forecast.forecastday[2].date );
    let finaldate3 = date3.getDay() 
    function date3Final(d3){
        document.getElementById("aftertomorrowDate").innerHTML = weekArr[d3] ;
    }
    date3Final(finaldate3)
    let finalAfterTommorow = finalResponse.forecast.forecastday[2] ;
    document.getElementById("afterTommorowIcon").innerHTML = `<img src="https:${finalAfterTommorow.day.condition.icon}">`;
    document.getElementById("afterTommorowMorningTemp").innerHTML = finalAfterTommorow.day.maxtemp_c + "<sup>o</sup>c" ;
    document.getElementById("afterTommorowNightTemp").innerHTML = finalAfterTommorow.day.mintemp_c + "<sup>o</sup> " ;
    document.getElementById("afterTommorowCustom").innerHTML = finalAfterTommorow.day.condition.text ;

}
getWeather()

// search

// countrySearch("القاهرة");

let searchInput = document.getElementById("searchInput") ;
searchInput.addEventListener("input" , function(){
    let searchInputName = searchInput.value;
    async function countrySearch(){
        let search = await fetch(`http://api.weatherapi.com/v1/search.json?key=01cec59779c249a7aca105056232002&q=${searchInputName}`)        
        let finalSearch = await search.json() ; 
        // console.log(finalSearch)

        if(finalSearch.length >= 1){
            if(finalSearch[0].name != undefined){
                if(searchInput.value){
                let searchCode = finalSearch[0].name ;
                let searchCodeName = `https://api.weatherapi.com/v1/forecast.json?key=01cec59779c249a7aca105056232002&q=${searchCode}&days=3`
                getWeather(searchCodeName);
                }
                else{
                    getWeather()
                }
            } 
            else{

            }
        }
    }
    countrySearch();

})
