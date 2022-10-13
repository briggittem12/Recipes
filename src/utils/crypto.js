const bcrypt = require('bcrypt')


//? Encripta la contraseña del usuario cuando se crea o se modifica la contraseña
const hashPassword = (plainPassword) => { // -> el parametro es la contraseña
    return bcrypt.hashSync(plainPassword, 10) //-> el round 'number' es la cantidad de veces que estamos ejcutando 
}


//? Comparar si la contraseña briggitte12 es =  a $2b$10$MKX3jlM9i47K.hIlrIB0Yuz2AdVz3owLmRHp3uyM5sCl0hDV6BLoC
const comparePassword = (plainPassword, hashedPassword) => {
    //* plainPassword : Contraseña que recibimos del Login
    //* hashedPassword : Contraseña que tenenemos guardada en la base de datos
    //! Esta utilidad se usa cuando hacemos un login y recibimos la contraseña del usuario 
    //! y la comparamos con la que tenemos en la DB
    return bcrypt.compareSync(plainPassword, hashedPassword)
}


//console.log(hashPassword('briggitte12'))

//console.log(comparePassword('briggitte12', '$2b$10$MKX3jlM9i47K.hIlrIB0Yuz2AdVz3owLmRHp3uyM5sCl0hDV6BLoC'))

module.exports = {
    hashPassword,
    comparePassword
}

