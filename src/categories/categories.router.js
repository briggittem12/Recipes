const router = require('express').Router()

const categoryServices = require('./categories.services')
const adminValidate = require('../middlewares/role.middleware')
const passport = require('passport')


router.route('/')
        .get(categoryServices.getAllCategories)
        .post(
            passport.authenticate('jwt', {session: false}),
            adminValidate,
            categoryServices.createCategory
        )

router.route('/:id')
        .get(categoryServices.getCategoryById)
        .delete(
            passport.authenticate('jwt', {session: false}),
            adminValidate,
            categoryServices.deleteCategory
        )


module.exports = router