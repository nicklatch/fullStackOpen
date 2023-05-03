import { Suspense } from "react";
import Weather from "./Weather";
import { Card, Text } from "@mantine/core";

/* eslint-disable react/prop-types */
const SingleMatch = ({ results }) => {
  const country = results[0];

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
      }}
    >
      <Text fz="xl" tt="uppercase" fw={700}>
        {country.name.common}
      </Text>
      <Text fw={600}>Capital(s): {country.capital.join(", ")}</Text>
      <Text fw={600}>Area: {country.area}</Text>
      <Text fw={600}>Language(s):</Text>
      <ul>
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
