const router = require('express').Router()
const passport = require('passport')

const recipeServices = require('./recipes.services')
require('../middlewares/auth.middleware')(passport)

router.route('/')
        .get(recipeServices.getAllRecipes)
        .post(
                passport.authenticate('jwt', {session: false}),
                recipeServices.createRecipes
        )

router.route('/:id')
        .get(recipeServices.getRecipesById)
        .patch(
                passport.authenticate('jwt', {session: false}),
                recipeServices.updateRecipes
        )
        .delete(
                passport.authenticate('jwt', {session: false}),
                recipeServices.deleteRecipes
        )


module.exports = router