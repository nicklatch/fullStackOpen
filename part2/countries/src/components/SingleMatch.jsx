import { Suspense, useEffect } from "react";
import Weather from "./Weather";
import { Card, Text } from "@mantine/core";

/* eslint-disable react/prop-types */
const SingleMatch = ({ results }) => {
  const country = results[0];

  useEffect(() => {
    document.title = country.name.common;
  }, [country]);

  useEffect(() => {
    document.querySelector("link[rel~=icon]").href = country.flags.svg;
  }, [country]);

  return (
    <Card
      withBorder
      radius="md"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30vw",
        marginBottom: 10,
        boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.1)"
      }}
    >
      <Text fz="xl" tt="uppercase" fw={700}>
        {country.name.common}
      </Text>
      <Text fw={600}>Capital(s): {country.capital.join(", ")}</Text>
      <Text fw={600}>
        Area: {country.area.toLocaleString("en-us")} km<sup>2</sup>
      </Text>
      <Text fw={600}>Language(s):</Text>
      <ul style={{ marginTop: 0 }}>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>
            <Text fw={400}>{lang}</Text>
          </li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ margin: "0 auto", borderRadius: 10 }}
      />
      <Suspense fallback="...Loading">
        <Weather capitalInfo={country.capitalInfo} />
      </Suspense>
    </Card>
  );
};

export default SingleMatch;
