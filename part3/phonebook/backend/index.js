import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const generateId = Math.floor(Math.random() * 1000000);

  const person = request.body;
  const errors = [];
  if (!person.name || !person.name.length) {
    errors.push({ error: "name is required" });
  }
  if (!person.number || !person.number.length) {
    errors.push({ error: "number is required" });
  }

  const personExist = persons.some((p) => p.name === person.name);
  if (personExist) {
    errors.push({ error: "name already exist" });
  }

  if (errors.length) {
    response.status(400).json(errors);
    return;
  }

  const newPerson = {
    id: generateId,
    name: person.name,
    number: person.number,
  };

  persons.push(newPerson);

  response.status(201).json(newPerson);
});

app.get("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find((person) => person.id === personId);

  if (!person) {
    response.status(404).end();
    return;
  }

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter((person) => person.id !== personId);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const countPersons = persons.length;
  const requestDate = new Date();

  const htmlInfo = `
        <p>Phonebook has info for ${countPersons} people</p>
        <p>${requestDate}</p>
    `;

  response.send(htmlInfo);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
