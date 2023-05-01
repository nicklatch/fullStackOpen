require("dotenv").config();
const express = require("express");
const cors = require("cors");
const process = require("process");
const Person = require("./models/person");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);

app.get("/api/persons/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: "Name and/or Number Missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

console.log(new Date().toString());
