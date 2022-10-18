//? Dependencies
const express = require('express')
const db = require('./utils/database')

//? files
const {port} = require('./config')
const usersRouter = require('./users/users.router')
const authRouter = require('./auth/auth.routes')
const initModels = require('./models/initModels')

//? Initial configs
const app = express()

app.use(express.json())

db.authenticate()
    .then(() => {console.log('Database Authernticate')})
    .catch(err => console.log(err))


db.sync()
    .then(() => {console.log('Database sync')})
    .catch(err => console.log(err))

initModels()
/* EJEMPLO 
app.use('/',(req, res, next) => {
    if(req.method !== 'GET'){
        console.log('Se esta ejecutando un middleware',req.method)
        next()
    } else {
        res.status(400).json({message:'Ey, hiciste una peticion GET'})
    }
} ,(req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
})

*/

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
})

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)




//? inital server 
app.listen(port, () => {
    console.log(`Server started port ${port}`)
})