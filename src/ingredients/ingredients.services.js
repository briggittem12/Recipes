const ingredientsController = require('./ingredients.controller')

const getAllIngredients = (req, res) => {
    ingredientsController.getAllIngredients()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({message: err.message}))
}

const getIngredientsById = (req, res) => {
    const id = req.params.id
        ingredientsController.getIngredientsById(id)
            .then(data => {
                if(data){
                    res.status(200).json(data)
                } else {
                    res.status(400).json({message: 'Invalid ID'})
                }
            })
            .catch(err => res.status(400).json({message: err.message}))
}


const createIngredients = (req, res) => {
    const { name, typeId, urlImg } = req.body
        if(name && typeId && urlImg){
            ingredientsController.createIngredients({ name, typeId, urlImg })
                .then(data => res.status(201).json(data))
                .catch(err => res.status(400).json({message: err.message}))
        } else {
            res.status(400).json({
                message: 'Missing data',
                fields: {
                    name: 'string',
                    typeId: 'uuid',
                    urlImg: 'string'
                }
            })
        }
}


const updateIngredients = (req, res) => {
    const id = req.params.id
    const { name, typeId, urlImg } = req.body
        ingredientsController.updateIngredients(id, { name, typeId, urlImg })
            .then(data => {
                if(data){
                    res.status(200).json({message: `User by id: ${id} edited succesfull `})
                } else {
                    res.status(404).json({message: 'Invalid ID'})
                }
            })
            .catch(err => {res.status(400).json({message: err.message})})
}


const deleteIngredients = (req, res) => {
    const id = req.params.id
        ingredientsController.deleteIngredients(id)
            .then(data => {
                if(data){
                    res.status(204).json(data)
                } else {
                    res.status(404).json({message: 'Invalid ID'})
                }
            })
            .catch(err => res.status(400).json({message: err.message}))
}


module.exports = {
    getAllIngredients,
    getIngredientsById,
    createIngredients,
    deleteIngredients,
    updateIngredients
}