let key="336d9b889d5f0c4ce0099b018ff33e62";

let container=document.getElementById("container");
let container7=document.getElementById("container7");
let iframe=document.getElementById("gmap_canvas");



async function getWeatherData(){
    try{
        let city=document.getElementById("city").value;
        let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        let data=await res.json();
        showWeather(data);
    }
    catch(err){
        console.log("err:",err);
    }
}



function showWeather(d){
    console.log("d:",d);
    

    container.innerHTML=null;
    
    let name=document.createElement("p");
    name.innerText=`Place- ${d.name}`;

    let max_temp=document.createElement("p");
    max_temp.innerText=`Temp-max - ${d.main.temp_max}°`;

    let min_temp=document.createElement("p");
    min_temp.innerText=`Temp-min - ${d.main.temp_min}°`;

    let wind=document.createElement("p");
    wind.innerText=`Wind direction - ${d.wind.deg} , Wind speed - ${d.wind.speed}`

    let clouds=document.createElement("p");
    clouds.innerText=`Cloudiness- ${d.clouds.all}%`

    var sunrisee=d.sys.sunrise;
    var sunsett=d.sys.sunset;
    
    function timestamp(sunrisee){
        var date=new Date(sunrisee*1000);
        var hours=date.getHours();
        var minutes="0"+date.getMinutes();
        var seconds="0"+date.getSeconds();
        var formattedTime=hours+':'+minutes.substr(-2)+':'+seconds.substr(-2);
        return formattedTime;
    }
    function timestampsunset(sunsett){
        var date=new Date(sunsett*1000);
        var hours=date.getHours();
        var hours=date.getHours();
        var minutes="0"+date.getMinutes();
        var seconds="0"+date.getSeconds();
        var formattedTime=hours+':'+minutes.substr(-2)+':'+seconds.substr(-2);
        return formattedTime;
    }
    let lat=d.coord.lat;
    let lon=d.coord.lon;

    get7days(lat,lon)

    let sunrise=document.createElement("p");
    sunrise.innerText=`Sunrise - ${timestamp(sunrisee)}am , Sunset - ${timestampsunset(sunsett)}pm`

    let humidity=document.createElement("p");
    humidity.innerText=`Humidity - ${d.main.humidity}%`;

    iframe.src = `https://maps.google.com/maps?q=${d.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    container.append(name,max_temp,min_temp,wind,clouds,sunrise,humidity);
}

async function get7days(lat,lon){
    try{
        let res=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alets&appid=${key}&units=metric`);
        let data=await res.json();
        console.log("data:",data);
        append7daysdata(data.daily)
    }
    catch(err){
        console.log("err:",err);
    }
}


function append7daysdata(data){
    container7.innerHTML="";
    data.forEach(function (elem){
        let div=document.createElement("div");

        let day_ofthe_week=document.createElement("p");
        day_ofthe_week.textContent= `${day(elem.dt)}`;

        function day(timestamp){
        
          var a = new Date(timestamp*1000);
          var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          var dayOfWeek = days[a.getDay()]
            
            return dayOfWeek;
        }

        let image=document.createElement('img');
        image.src=`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;

        let weathercondition=document.createElement('p');
        weathercondition.textContent=elem.weather[0].description;

        let max_temp=document.createElement("p");
        max_temp.innerText=` ${elem.temp.max}°`;
    
        let min_temp=document.createElement("p");
        min_temp.innerText=` ${elem.temp.min}°`;

        div.append(day_ofthe_week,image,weathercondition,max_temp,min_temp);
        container7.append(div)
    })
   
}