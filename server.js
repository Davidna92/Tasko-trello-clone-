const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

//dotenv file
require('dotenv').config();

//Routes 
const auth = require('./routes/auth');
const users = require('./routes/users');


//Enable requests from all cors
app.use(cors());

//bodyParser
app.use(bodyParser.json());

//Connect to mongodb database
mongoose
    .connect(
        process.env.DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connected to mongodb'))
    .catch((error) => console.log('Error connecting to mongodb: ' + error));


//Use routes
app.use('/trello/auth', auth);
app.use('/trello/users', users);

//Port listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server is up, listening to port ' + PORT));
