const { getUserByEmail } = require('../users/users.controler')
const { comparePassword } = require('../utils/crypto')
//* Email y contraseña 
//?email es uncio en la database

const loginUser = async (email, password) => {
    try {
       const user = await getUserByEmail(email)
       //? user.password contiene la contraseña encriptada 
       const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        }
        return false
    } catch (err) {
        return false
    }
        
}


module.exports = {
    loginUser
}