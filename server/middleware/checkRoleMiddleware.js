const jwt = require('jsonwebtoken')
 
module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: "Не авторизован 1"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({message: "Не авторизован 2"})
        }
    }
}

