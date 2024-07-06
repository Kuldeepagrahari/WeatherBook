import React, { useEffect, useRef, useState } from 'react'
import "./weatherdet.css"
import searchIcon from "../assets/search.png"
import clear  from "../assets/clear.png"
import cloud  from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import humidity from "../assets/humidity.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import wind from "../assets/wind.png"


const WeatherDetails = () => {

    const [weatherData, setdata] = useState(false)

    const searchRef = useRef()

    const weatherIcons = {
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03n":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow
        
    }

  async function searcher(city) {
      try{

         if ( city === ""){
            alert("Enter Your City First!")
            return
         }
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`

          const withoutJSON = await fetch(url)
          if ( !withoutJSON.ok){
            alert("Your City Does Not Found")
            return
          }
          const data  = await withoutJSON.json()
          const weatherIcon = weatherIcons[data.weather[0].icon]
          
          console.log(data)
          setdata({
            temperature:Math.floor(data.main.temp),
            wind:data.wind.speed,
            humidity:data.main.humidity,
            location:data.name,
            icon:weatherIcon,
            description:data.weather[0].description 

          })
          console.log(weatherData)
      }
      catch{
       console.error("server error")
      }
  }

  
//   useEffect(()=>{
//     searcher(input.current.value)
//   },[])


  return (
    <div className='weather-det'>
      <div className="left">
        <div className="search">
            <input type="text" placeholder='Search' className='input' ref={searchRef}/>
            <img src = {searchIcon} alt="search" onClick={()=>{
                searcher(searchRef.current.value)
            }}/>
        </div>
        <div className="weather-info">
            <img src={weatherData.icon || clear} alt="weather" className='weather-image'/>
            <p className='temperature'>{weatherData.temperature || 30}°c</p>
            <p className='location'>{weatherData.location || "SamCity"}</p>
        </div>
      </div>
      <div className="right">
        <div className="description">
            <h2 style={{backgroundColor:"black",color:"white",borderRadius:"10px",padding:"20px 20px",marginBottom:"15px",fontWeight:"600"}}>
                {weatherData.description || "All Clear Sam"}
            </h2>
        </div>
          <div className="humidity">
             <img src={humidity} 
             alt="humidity" />
              <span>   <h1>{weatherData.humidity || "56"}</h1>
             <h2>Humidity</h2></span>
          </div>
          <div className="windSpeed">
           
            <img src={wind} alt="wind" />
            <span>  <h1>{weatherData.wind || "5"} Km/h</h1>
            <h2>Wind Speed</h2></span>
           
          </div>
          <div className="message">
            <h3>Made with ❤️ for You !</h3>
          </div>
      </div>
    </div>
  )
}

export default WeatherDetails
