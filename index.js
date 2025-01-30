const express = require('express');
const { resolve } = require('path');
const connectdb = require('./datab');
const user=require('./schema')

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json()); // Middleware to parse JSON request bodies

connectdb();

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body; // Extracting from request body

  try {
    if (!name || !email || !password) {
      return res.status(400).send({ message: "VALIDATION ERROR, ALL FIELDS ARE REQUIRED" });
    }
    const newuser = new user({
      name,
      email,
      password
    });

    await newuser.save();
    res.status(201).send({ message: "created successfully" });
  } catch (error) {
    console.log("Error creating user:", error); // Improved error logging
    res.status(500).send({ message: "server error couldn't save" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
