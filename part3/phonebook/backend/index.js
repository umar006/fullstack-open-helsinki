const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");
require("dotenv").config();

const app = express();

const Person = require("./models/person");
const personRouter = require("./routes/routes");

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
