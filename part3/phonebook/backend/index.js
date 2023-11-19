const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
require("dotenv").config();

const app = express();

const Person = require("./models/person");
const personRouter = require("./routes/routes");
const logger = require("./utils/logger");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use(logger.requestLogger);

app.use("/api/persons", personRouter);

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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
