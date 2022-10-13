//? Dependencies
const express = require('express')


//? files
const {port} = require('./config')
const usersRouter = require('./users/users.router')


//? Initial configs
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({message: 'Ok!', users: `localhost:${port}/api/v1/users`})
})

app.use('/api/v1/users', usersRouter)


//? inital server 
app.listen(3000, () => {
    console.log(`Server started port ${port}`)
})