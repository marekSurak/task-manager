const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully.');
});

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.listen(port, () => {
    console.log('Server is running on port: ', port);
}); 