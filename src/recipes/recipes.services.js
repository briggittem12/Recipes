const recipesController = require('./recipes.controller')

const getAllRecipes = (req, res) => {
    recipesController.getAllRecipes()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({message: err.message}))
}

const getRecipesById = (req, res) => {
    const id = req.params.recipe_id
        recipesController.getRecipesById(id)
            .then(data => {
                if(data){
                    res.status(200).json(data)
                } else {
                    res.status(404).json({message: 'Invalid ID', id})
                }
            })
            .catch(err => res.status(400).json({message: err.message}))
}

const createRecipes = (req, res) => {
    const userId = req.user.id
    const { title, description, urlImg, time, portions, categoryId, origin } = req.body
        if( title && description && time && portions && categoryId ){
            recipesController.createRecipes({ title, description, urlImg, time, portions, categoryId, origin, userId })
            .then(data => res.status(201).json(data))
            .catch(err => res.status(400).json({message: err.message}))
        } else {
            res.status(400).json({
                message: 'Missing data',
                fields: {
                    title: 'string',
                    description: 'string',
                    time: 'number', 
                    portions: 'number',
                    categoryId: 'number',
                }
            })
        }
}


const updateRecipes = (req, res) => {
    const id = req.params.recipe_id
    const { title, description, urlImg, time, portions, categoryId, origin } = req.body
        recipesController.updateRecipes(id, { title, description, urlImg, time, portions, categoryId, origin})
            .then(data => {
                if(data[0]){
                    res.status(200).json({message: `Recipe with ID: ${id} edited succesfully`})
                } else
                    res.status(404).json({message: 'Invalid ID', id})
            })
            .catch(err => res.status(400).json({message: err.message}))
}


const deleteRecipes = (req, res) => {
    const id = req.params.recipe_id
        recipesController.deleteRecipes(id)
            .then(data => {
                if(data){
                    res.status(204).json(data)
                } else {
                    res.status(404).json({message: 'Invalid ID', id})
                }
            })
            .catch(err => res.status(400).json({message: err.message}))
}


const getMyRecipes = (req, res) => {
    const userId = req.user.id
        recipesController.getMyRecipes(userId)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json({message: err.message}))
}




module.exports = {
    createRecipes,
    getAllRecipes,
    getRecipesById,
    updateRecipes,
    deleteRecipes,
    getMyRecipes
}