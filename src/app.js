const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3003

const srcDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(srcDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Shashank Ravikumar'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        author: 'Shashank Ravikumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Shashank Ravikumar',
        message: 'Help me!!!!'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address

    if(!location){
        return res.send({
            error: 'Enter a city name to search'
        })
    }

        geocode(location, (err, { latitude, longitude, location } = {}) => {
            if(err){
                return res.send({error: err});
            } 
    
            forecast(latitude, longitude, (error, data) => {
                if(error){
                    return res.send(error);
                }

                res.send({
                    location,
                    data
                })
    
                // console.log(`The temparature in ${location} is ${data.current.temperature}°C, but feels like ${data.current.feelslike}°C. Chances of rain is ${data.current.precip}%.`)
                
            })
        })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        author: 'Shashank Ravikumar',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        author: 'Shashank Ravikumar',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server up & running on ' + port);
})