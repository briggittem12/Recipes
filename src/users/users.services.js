const usersControllers = require('./users.controler')


const getAllUsers = (req, res) => {
    usersControllers.getAllUsers()
        .then(response => {res.status(200).json(response)})
        .catch(err => res.status(400).json({message: err.message}))
}

const getUserById = (req, res) => {
    const id = req.params.id
        usersControllers.getUserById(id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).json({message: err.message}))
}


const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body
    //* menejo de errores para validar todos los datos 
    if (firstName && lastName && email && password && phone && birthday ) { //* && si exite tal dato, aqui se verifica si es obligatorio
        //* ejecutamos el controler --
        usersControllers.createUser({
            firstName, lastName, email, password, phone, birthday, gender, country
        })
        .then(data => {res.status(201).json(data)})
        .catch(err => res.status(400).json({message: err.message}))
    } else {
        //*error por falta de datos 
        res.status(400).json({message: 'All fields almost completed', fields: {
            firstName: 'string',
            lastName: 'string',
            email: 'string@examplE.com',
            password: 'string',
            phone: '+534444455225',
            birthday: 'YYYY/MM/DD',
        }})
    }
}


const patchUser = (req, res) => {
    const id = req.params.id
    const { firstName, lastName, phone, gender, country } = req.body 
        usersControllers.updateUser(id, { firstName, lastName, phone, gender, country })
            .then(data => {
                if(data[0]){
                    res.status(200).json({message: `User by id: ${id} edited succesfull `})
                } else {
                    res.status(404).json({message: 'Invalid ID'})
                }
            })
            .catch(err => {res.status(400).json({message: err.message})})
}

const deleteUser = (req, res) => {
    const id = req.params.id 
        usersControllers.deleteUser(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => res.status(400).json({message: err.message}))

}


module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    deleteUser,
    registerUser
}