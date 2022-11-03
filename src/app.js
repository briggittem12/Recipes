//? Dependencies
const express = require('express')
const db = require('./utils/database')
const cors = require('cors')

//? files
const {port} = require('./config')
const usersRouter = require('./users/users.router')
const authRouter = require('./auth/auth.routes')
const categorysRouter = require('./categories/categories.router')
const typesRouter = require('./types/types.router')
const ingredientsRouter = require('./ingredients/ingredients.router')
const recipesRouter = require('./recipes/recipes.router')
const initModels = require('./models/initModels')

//? Initial configs
const app = express()

app.use(express.json())

app.use(cors())

db.authenticate()
    .then(() => {console.log('Database Authernticate')})
    .catch(err => console.log(err))


db.sync()
    .then(() => {console.log('Database sync')})
    .catch(err => console.log(err))

initModels()


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
})

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categorysRouter)
app.use('/api/v1/types', typesRouter)
app.use('/api/v1/ingredients', ingredientsRouter)
app.use('/api/v1/recipes', recipesRouter)




//? inital server 
app.listen(port, () => {
    console.log(`Server started port ${port}`)
})