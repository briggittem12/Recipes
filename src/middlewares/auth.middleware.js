//! Middleware para potger rutas


//* 1. Revisar si existe un token
//* 2. Verificar si el token pertenece a un usuario valido
//* 3. Modificar el req y agregar req.user con la informacion desencriptada del token


const { jwtSecret } = require('../config');
const { getUserById } = require('../users/users.controler');


const JwtStrategy = require('passport-jwt').Strategy; //* maneja estrategias para la autenticazion 
const ExtractJwt = require('passport-jwt').ExtractJwt; //* extrae los headers de la peticion 


//* exportar funcion anonima, en el objeto se van las configuraciones de la extrategia 
module.exports = (passport) => {
    const options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'), //TODO esta linea se va a encargar de buscar el token que inicie con JWT en los headers
        secretOrKey : jwtSecret
    }
    
    passport.use(
        new JwtStrategy(options, async (decoded, done) => {  //* done(error, decoded)
            try {
                const response = await getUserById(decoded.id)
                    if(!response){
                        return done(null, false)
                    }
                    console.log('decoded JWT', decoded)
                    return done(null, decoded)
            } catch (error) {
                return done(error, false)
            }
        })
    )
    
}

