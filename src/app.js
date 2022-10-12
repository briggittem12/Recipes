//? Dependencies
const express = require('express')


//? files
const {port} = require('./config')


//? Initial configs
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({message: 'Ok!', users: `localhost:${port}/api/v1/users`})
})




//? inital server 
app.listen(3000, () => {
    console.log(`Server started port ${port}`)
})