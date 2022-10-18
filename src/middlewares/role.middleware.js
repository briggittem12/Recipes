const adminValidate = (req, res, next) => {
    const role = req.user.role

        if(role === 'admin') { //* si tiene permisos puede ejecutar la funcion next 
            next()
        } else {
            res.status(401).json({messague: 'Access Denied!'}) //* si no devuleve error 
        }
}


module.exports = adminValidate