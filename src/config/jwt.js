const jwt = require('jsonwebtoken')

const createToken = (data, expiresIn) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn });   // "30d" login | "1h" confirmation mails
    } catch (error) {
        console.log(error)
    }
}

const checkToken = (token) => {
    try {
        let data = null
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return console.log('> Error al obtener data del token JWT')
            } else {
                data = decoded
            } 
        });

        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createToken, checkToken }