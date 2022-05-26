
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config({ path: './config.env' });
//connection with DB
require('./DB/conn');
const admin = require('./routers/auth');
const patient = require('./routers/farmers');
app.use(express.json());

app.options('*', cors());
app.use(cors());


app.use('/admin', admin);
app.use('/farmer', patient);
app.get('/', async (req, res) => {
    res.send("FYP-backend")
})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening port ${port}`));