const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use(
  morgan(
    function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        JSON.stringify(req.body),
      ].join(" ");
    },
    { skip: (req, res) => req.method !== "POST" },
  ),
);

app.get("/api/persons", (request, response) => {
  Person.find().then((result) => {
    response.json(result);
  });
});

app.post("/api/persons", (request, response, next) => {
  const person = request.body;
  const errors = [];
  if (!person.name || !person.name.length) {
    errors.push({ error: "name is required" });
  }
  if (!person.number || !person.number.length) {
    errors.push({ error: "number is required" });
  }

  if (errors.length) {
    response.status(400).json(errors);
    return;
  }

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });

  newPerson
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;

  Person.findById(personId)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const personId = request.params.id;
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(personId, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const personId = request.params.id;
  Person.findByIdAndDelete(personId)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.find().then((persons) => {
    const countPersons = persons.length;
    const requestDate = new Date();

    const htmlInfo = `
        <p>Phonebook has info for ${countPersons} people</p>
        <p>${requestDate}</p>
    `;

    response.send(htmlInfo);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
