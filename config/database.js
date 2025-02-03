const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("mongodb connection")
    }).catch((err) => {
        console.log("mongodb connection error" + err.message)
    })
}

module.exports = db;