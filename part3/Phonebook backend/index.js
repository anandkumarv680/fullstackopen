require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const PersonS = require('./models/personModel');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));


// Morgan
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);


// Home
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});


// Info
app.get("/info", (request, response, next) => {
  PersonS.countDocuments({})
    .then(count => {
      response.send(
        `<p>Phonebook has info for ${count} people</p>
         <p>${new Date()}</p>`
      );
    })
    .catch(error => next(error));
});


// Get all persons
app.get("/api/persons", (request, response, next) => {
  PersonS.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => next(error));
});


// Get person by ID
app.get('/api/persons/:id', (req, res, next) => {
  PersonS.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end();
      }

      res.json(person);
    })
    .catch(error => next(error));
});


// Delete person
app.delete('/api/persons/:id', (req, res, next) => {
  PersonS.findByIdAndDelete(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).end();
      }

      res.status(204).end();
    })
    .catch(error => next(error));
});


// Update person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  PersonS.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .then(updatedPerson => {
      if (!updatedPerson) {
        return res.status(404).end();
      }

      res.json(updatedPerson);
    })
    .catch(error => next(error));
});


// Add person
app.post("/api/persons", (req, res, next) => {
  const person = req.body;

  const newPerson = new PersonS({
    name: person.name,
    number: person.number
  });

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson);
    })
    .catch(error => next(error));
});


// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    });
  }

  next(error);
};

app.use(errorHandler);


// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Port is listening at ${PORT}`);
});