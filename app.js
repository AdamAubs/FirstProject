const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Creativespot = require('./models/creativespot');

mongoose.connect('mongodb://localhost:27017/creative-spot',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res) => {
    res.send('home')
})

app.get('/makecreative', async (req, res) => {
    const spot = new Creativespot({title: 'My house', description: 'the start'});
    await spot.save();
    res.send(spot)
})


app.listen(3000, () => {
    console.log("Serving on port 3000")
})