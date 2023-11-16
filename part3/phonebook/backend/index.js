import express from "express";

const app = express();

const persons = [
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

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find((person) => person.id === personId);

  response.json(person);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
