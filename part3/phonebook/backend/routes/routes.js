const personRouter = require("express").Router();
const Person = require("../models/person");

personRouter.get("/", (request, response) => {
  Person.find().then((result) => {
    response.json(result);
  });
});

personRouter.post("/", (request, response, next) => {
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

personRouter.get("/:id", (request, response, next) => {
  const personId = request.params.id;

  Person.findById(personId)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => next(err));
});

personRouter.put("/:id", (request, response, next) => {
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

personRouter.delete("/:id", (request, response, next) => {
  const personId = request.params.id;
  Person.findByIdAndDelete(personId)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = personRouter;
