const jwt = require('jsonwebtoken')

exports.verifyJwtToken = (token) => {
    try {
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET)
        return decodedValue
    } catch(err) {
        console.log('Token verify error: ', err)
        return {}
    }
}

exports.getContextOfRequest = (req) => {
    const accessToken = req.headers?.autorization
    const context = {}
    if(accessToken) {
        const decodedvalue = verifyJwtToken(accessToken.split(' ')[1])
        context.user = decodedvalue
    }
    return context
}