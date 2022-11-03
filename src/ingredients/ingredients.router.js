const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')


const ingredientService = require('./ingredients.services')
require('../middlewares/auth.middleware')(passport)


router.route('/')
        .get(ingredientService.getAllIngredients)
        .post(
                passport.authenticate('jwt', {session: false}),
                adminValidate,
                ingredientService.createIngredients
        )

router.route('/:id')
        .get(ingredientService.getIngredientsById)
        .patch(
                passport.authenticate('jwt', {session: false}),
                adminValidate,
                ingredientService.updateIngredients
        )
        .delete(
                passport.authenticate('jwt', {session: false}),
                adminValidate,
                ingredientService.deleteIngredients
        )

router.post('/:ingredient_id/add_to_user', 
        passport.authenticate('jwt', {session: false}),
        ingredientService.addIngredientUser
)



module.exports = router