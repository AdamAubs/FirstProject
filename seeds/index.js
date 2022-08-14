const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const creativespot = require('../models/creativespot');

mongoose.connect('mongodb://localhost:27017/creative-spot',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await creativespot.deleteMany({});
    for(let i= 0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const spot = new creativespot({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`
        })
        await spot.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});