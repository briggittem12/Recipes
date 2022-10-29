const router = require('express').Router()

const typeServices = require('./types.services')

router.route('/')
        .get(typeServices.getAllTypes)
        .post(typeServices.createType)

router.route('/:id')
        .get(typeServices.getTypeById)
        .delete(typeServices.deleteType)


module.exports = router