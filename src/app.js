const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const weatherapp = require('./utills/forecast');
const geolocation = require('./utills/gelocation');
// const cors=require('cors');
// app.use(cors({origin: 'http://localhost:3000'}));

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));
const publicdirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.use(express.static(publicdirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vijisha B V'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vijisha BV'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        msg: 'Here you can see the helping commands',
        name: 'Vijisha BV'
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.location;
    if (!address) {
        return res.send({
            error: 'please enter a location as querystring'
        })
    }
    geolocation(address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        weatherapp(latitude, longitude, (error, { temperature, feelslike, weatherdescription }) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location: address,
                forecast: weatherdescription
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'please provide a search term'
        });
    }
    res.send({
        product: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('helppageNF', {
        title: 'Help Article Not Found',
        errorMessage: 'Sorry, Help Article Not Found Page not found........'
    }
    );
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: 'Page Not Found',
        errorMessage: 'Sorry, Page not found........'
    });
})

app.listen(3000, () => {
    console.log('server is up on port 3');
});