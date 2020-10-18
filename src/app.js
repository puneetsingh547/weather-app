const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')
const app = express()

const publicDirectoryName = path.join(__dirname , '../public')
const viewDirectory = path.join(__dirname , '../templates/views')
const partialDirectory = path.join(__dirname , '../templates/partials')



app.set('view engine', 'hbs')
app.set('views' , viewDirectory)
hbs.registerPartials(partialDirectory)

app.use(express.static(publicDirectoryName))



app.get('' , (req , res)=>{
    res.render('', {
        title:'weather',
        name:'Puneet Choudhary',
        email:'puneetsingh547@gmail.com'
    })
})

app.get('/about' , (req, res)=>{
    res.render('about', {
        title:'About',
        aboutContent: 'This is about page',
        name:'Puneet'
    })
})

app.get('/help' , (req, res)=>{
    res.render('help', {
        title:"Help",
        helpContent: "Handlebars Content",
        name:'Puneet'
    })
})

app.get('/help/*', (req , res)=>{
    res.render('404' , {
        title:404,
        content:'Help article not found',
        name:'Puneet'
    });
})

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide Address'
        }) 
    }
    geocode(req.query.address , (error , {lattitude , longitude , location})=>{
        if(error){
            return res.send({error})
        }
        forecast(lattitude, longitude , (err , forecastData)=>{
            if(err){
                return res.send(err)
            }
             
            res.send(forecastData)

        })
    })
    // res.send({
    //     forcast: 'Its raining',
    //     location: 'Delhi'
    // })
        
    
})

app.get('/products' , (req , res)=>{
    console.log(req.query)
    res.send(req.query)
})

app.get('*', (req , res)=>{
    res.render('404' , {
        title:404,
        content:'Page Not Found',
        name:'Puneet'
    });
})

app.listen(3000 , (err)=>{
    console.log('Server runing on port 3000')
});
