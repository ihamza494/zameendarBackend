const mongoose = require('mongoose');
const url = process.env.DATABASE;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}
)
    .then(() => { console.log("successfully connect to Database") })
    .catch((err) => { console.error("Not connect to db", err) });