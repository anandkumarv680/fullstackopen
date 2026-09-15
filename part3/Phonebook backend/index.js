const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'))


morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));


let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// const requestLogger = (req, res, next) =>{
//   console.log('method', req.method)
//   console.log('path', req.path)
//   console.log('body', req.body)
//   next()

// }

// app.use(requestLogger)



// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

app.get("/", (request, response) => {
  response.send("<h1>Hello World<h1/>");
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people<p/><p>${new Date()}<p/>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});


app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (!person) {
    return res.status(404).end()
  }

  res.json(person)
})


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = persons.find(p => p.id === id)

  if (person) {
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  } else {
    res.status(404).send("User not Found")
  }
})

const makeId = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person.name) {
    return res.status(400).json({ error: "name must be fill" });
  }

  if (!person.number) {
    return res.status(400).json({ error: "number must be fill" });
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: makeId(),
    name: person.name,
    number: person.number
  };

  persons = [...persons, newPerson];

  res.status(201).json(newPerson);
});






const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Port is listening at ${PORT}`);
});

