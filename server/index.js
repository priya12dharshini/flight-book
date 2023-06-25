const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')


mongoose.connect("mongodb+srv://spd85250:priya@cluster0.4q1qgrs.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
