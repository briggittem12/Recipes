//! prefijo "/users"

const router = require('express').Router()
const passport = require('passport')

const userServices = require('./users.services')
const adminValidate = require('../middlewares/role.middleware')
const { getMyRecipes } = require('../recipes/recipes.services')

require('../middlewares/auth.middleware')(passport)

// rutas raiz -> van direcatamente a barra users

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

// ruta para obtner las recetas 

router.get('/me/my_recipes',
    passport.authenticate('jwt', {session: false}),
    getMyRecipes
)



// /api/v1/users/:id
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