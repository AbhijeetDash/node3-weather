const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geo = require('./utils/geo')
const info = require('./utils/info')

//set up static dir
const app = express()
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'../public/')))

//Setup handlebars
app.set('views', path.join(__dirname,'../templates/views/'))
app.set('view engine', 'hbs')

//Setup Partials
hbs.registerPartials(path.join(__dirname,'../templates/partials/'))

app.get('', (req, res)=>{
    res.render('index',{
        title : "Weather",
        name : "Abhijeet",
        content : "Search for your location" 
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About",
        name: "Abhijeet"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help",
        name : "Abhijeet",
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
        })
    }
    const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.address}.json?access_token=pk.eyJ1IjoiYWJoaWplZXRkYXNoMTk5OSIsImEiOiJjanhmd2J2N2kwb2NxM3lvZmtudWhqNmRvIn0.z56MBp6SfVrsP63jCNSELw`
    try{
        geo(mapbox,({condition, error})=>{
            if(error){
                return res.send({error})            
            }
            const darkSky = `https://api.darksky.net/forecast/676a6c46703dd49399488e176e91df11/${condition.center[1]},${condition.center[0]}`
            info(darkSky,(data, error)=>{
                if(error || !data){
                    console.log(error)
                    return res.send({error})
                }
                const value = data.condition.body.currently
                return res.send({
                    place : condition.place_name,
                    timezone : data.condition.body.timezone,
                    summary : value.summary,
                    temperature : value.temperature,
                    precipType : value.precipType,
                    precipProbability : value.precipProbability,
                    humidity : value.humidity,
                    pressure : value.pressure,
                    windSpeed : value.windSpeed 
                })
            })
        })      
    }catch(error){
       res.send({
           error : "No internet"
       })
    }
})

app.get('/*', (req, res)=>{
    req.path.includes('/help')?error = "Help article not found":error = "Page not found"   
    res.status(404).render('404',{error, title : "404", name: "Abhijeet"})
})

app.listen(port,()=>{})