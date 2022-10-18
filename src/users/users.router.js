//! prefijo "/users"

const router = require('express').Router()
const passport = require('passport')

const userServices = require('./users.services')
const adminValidate = require('../middlewares/role.middleware')

require('../middlewares/auth.middleware')(passport)

//*rutas raiz -> van direcatamente a barra users

router.get('/', 
passport.authenticate('jwt', {session: false}),
userServices.getAllUsers)

//* Info propia del user
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyInfo
    )
    .patch(
        passport.authenticate('jwt', {session: false}),
        userServices.updateMyInfo
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        userServices.deleteMyInfo
    )

//TODO EL REGISTERUSERES IRA EN LA RUTA /auth/resgister

//* rutas dinamicas por id - 

/** router.get('/:id', userServices.getUsersById ) */ //? manera antigua 

router.route('/:id')
    .get(userServices.getUserById)
    .patch(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.patchUser
        )
    .delete(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.deleteUser
        )



module.exports = router