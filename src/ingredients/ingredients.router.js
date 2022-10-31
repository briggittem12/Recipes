const router = require('express').Router()

const ingredientService = require('./ingredients.services')

router.route('/')
        .get(ingredientService.getAllIngredients)
        .post(ingredientService.createIngredients)

router.route('/:id')
        .get(ingredientService.getIngredientsById)
        .patch(ingredientService.updateIngredients)
        .delete(ingredientService.deleteIngredients)


module.exports = router