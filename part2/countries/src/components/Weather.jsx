/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

export default function Weather({ capitalInfo }) {
  const [weatherData, setWeatherData] = useState("");

  //: TODO create weather part

  return (
    <>
      <h3>Weather in {weatherData.name}</h3>
      <div>Temperature: </div>
    </>
  );
}
