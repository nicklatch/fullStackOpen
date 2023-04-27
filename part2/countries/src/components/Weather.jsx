/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

const NO_STEALIN_MUH_KEYS = "547d8d3b3f15f968f33469249e2da86e";

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
