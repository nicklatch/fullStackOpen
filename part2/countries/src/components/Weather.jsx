/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import axios from "axios";

export default function Weather({ capitalInfo }) {
  const [weatherData, setWeatherData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    capitalInfo.latlng[0]
  }&lon=${
    capitalInfo.latlng[1]
  }&appid=${"547d8d3b3f15f968f33469249e2da86e"}&units=imperial `;

  useEffect(() => {
    setTimeout(() => {
      axios.get(weatherUrl).then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
        setIsLoading(false);
      });
    });
  }, [weatherUrl]);

  return isLoading ? (
    <h2>...Loading</h2>
  ) : (
    <>
      <h3>Weather in {weatherData.name}</h3>
      <Text>Temperature: {weatherData.main.temp}&#176; Fahrenheit </Text>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>
      <Text>{Math.floor(weatherData.wind.speed)} MPH</Text>
    </>
  );
}
