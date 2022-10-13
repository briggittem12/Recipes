//! prefijo "/users"

const router = require('express').Router()

const userServices = require('./users.services')

//*rutas raiz -> van direcatamente a barra users

router.get('/', userServices.getAllUsers)

//TODO EL REGISTERUSERES IRA EN LA RUTA /auth/resgister
//* rutas dinamicas por id 

/** router.get('/:id', userServices.getUsersById ) */ //? manera antigua 

router.route('/:id')
    .get(userServices.getUserById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)



module.exports = router