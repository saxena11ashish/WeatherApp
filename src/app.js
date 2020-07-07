//START SCRIPT in PACKAGE.JSON: heroku looks for "start" script to start app, can be run locally using "npm run start"
//Comment made here bcoz JSON can not have comments


const path = require('path')            //core-node-module
const express = require('express')      //npm modules
const hbs = require('hbs')              
const geocode = require('./utils/geocode')      //user defined modules
const forecast = require('./utils/forecast')

const app = express()   //call express function once to create express application ie app
const port = process.env.PORT || 3000     //(for heroku || for local application)
// Defined paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'templates/views')
const partialsPath = path.join(__dirname,'templates/partials')
//Set up handlebars engine and view location
app.set('view engine', 'hbs')   // we have to tell express about the template engine we set up using "app.set('express-setting-name','value')"
app.set('views', viewsPath)     //all views have to be stored in the views directory,otherwise express can't render them. If we want to place the views in directory with any other name, we use app.set() that sets the views property so express can now render views from any other folder(not named views)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{        //index is fileName
        title:'Weather',
        name:'Ashish Saxena'
    }) //..rendering a view from views directory,file-extension not required
})

app.get('/about', (req,res)=>{  
    res.render('about',{        //about is fileName
        title:'About',
        name:'Ashish Saxena' 
    })
})

app.get('/help', (req,res) => {
    res.render('help', {        //help is fileName
        text: 'Let us know what problem you are facing ',
        title:'Help',
        name:'Ashish Saxena' 
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({           // return ensures we dont respond twice, ie send below does not get executed
            Error: 'Must provide location'
        })
    } 
    geocode(req.query.address, (error, {latitude,longitude,location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address 
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return   res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Ashish Saxena'         
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Ashish Saxena'
    })
})
app.listen(port, () => {    //3000 is port
    console.log('Server is up on port: '+ port)
})