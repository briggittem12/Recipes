const router = require('express').Router()


const ingredientService = require('./ingredients.services')


router.route('/')
        .get(ingredientService.getAllIngredients)
        .post(ingredientService.createIngredients)

router.route('/:id')
        .get(ingredientService.getIngredientsById)
        .patch(ingredientService.updateIngredients)
        .delete(ingredientService.deleteIngredients)

router.post('/:ingredient_id/add_to_user', 
        passport.authenticate('jwt', {session: false})
)



module.exports = router