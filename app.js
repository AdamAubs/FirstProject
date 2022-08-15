const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsmate = require('ejs-mate')
const methodOverride = require('method-override')
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

app.engine('ejs', ejsmate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    res.send('home')
})

app.get('/creativespots', async (req,res) => {
    const creativespots = await Creativespot.find({ });
    res.render('creativespots/index', {creativespots})
})

app.get('/creativespots/new', (req, res) => {
    res.render('creativespots/new')
})

app.post('/creativespots', async (req,res) => {
    const creativespot = new Creativespot(req.body.creativespot);
    await creativespot.save();
    res.redirect(`/creativespots/${creativespot._id}`)
})

app.get('/creativespots/:id', async(req, res) => {
    const creativespot = await Creativespot.findById(req.params.id)
    res.render('creativespots/show', {creativespot});
})

app.get('/creativespots/:id/edit', async(req, res) => {
    const creativespot = await Creativespot.findById(req.params.id)
    res.render('creativespots/edit', {creativespot});
})

app.put('/creativespots/:id', async (req,res) => {
    const {id} = req.params;
    const creativespot = await Creativespot.findByIdAndUpdate(id, {...req.body.creativespot})
    res.redirect(`/creativespots/${creativespot._id}`)
})

app.delete('/creativespots/:id', async(req, res) => {
    const {id} = req.params;
    await Creativespot.findByIdAndDelete(id)
    res.redirect(`/creativespots`)
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
})