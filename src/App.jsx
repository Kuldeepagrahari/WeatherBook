import React from 'react'
import WeatherDetails from './components/weatherDetails'
import './index.css'



const App = () => {
  return (
    <div className='app'>
      <h1 id='app-head'>Weather<span style={{color:"orange" ,fontWeight:"bolder"}}>Book</span>
       </h1>
      <WeatherDetails></WeatherDetails>
    </div>
  )
}

export default App
