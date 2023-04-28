const express = require("express");
const morgan = require("morgan");
const app = express();

// morgan.token("data", function (request, response) {}); //TODO: create toekn for exercise 3.8*
app.use(express.json());
morgan.token("body", (request, reponse) => {
  return request.get("content-type") === "application/json"
    ? JSON.stringify(request.body)
    : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.get("/info/", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p></ br><p>${new Date().toString()}</p>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generatedId = () => {
  const maxId = Math.floor(Math.random() * 1000);
  return persons.find((person) => person.id !== maxId) ? maxId : generatedId();
};

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "Name and/or Number Missing",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name Already Exists in Phonebook",
    });
  }
  const person = {
    id: generatedId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(new Date().toString());
