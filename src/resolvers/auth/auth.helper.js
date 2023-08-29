import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { appHelper, userHelper } from '../helpers.js'
import { CustomError } from '../utils/index.js'

const verifyJwtToken = (token) => {
    try {
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET)
        return decodedValue
    } catch (err) {
        console.log('Token verify error: ', err)
        return {}
    }
}

const verifyPassword = async (hashPassword, password) => {
    return await bcrypt.compare(password, hashPassword)
}

const generateToken = (user, expiresIn) => {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn
        }
    )
}

export const getContextOfRequest = (req) => {
    const accessToken = req.headers?.authorization
    if (accessToken) {
        const decodedvalue = verifyJwtToken(accessToken.split(' ')[1])
        req.user = decodedvalue
    }
    return { req }
}

export const loginToAnAccount = async (req) => {
    const { body } = req
    appHelper.validateRequiredFields(body, ['email', 'password'])
    const { email, password } = body
    const userInfo = await userHelper.getAnUser({
        email
    })
    if (!userInfo) {
        throw new CustomError(401, "Credential doesn't match")
    }
    if (!(await verifyPassword(userInfo.password, password))) {
        throw new CustomError(401, "Credential doesn't match")
    }
    return {
        accessToken: generateToken(userInfo, process.env.ACCESS_JWT_EXPIRE),
        refreshToken: generateToken(userInfo, process.env.REFRESH_JWT_EXPIRE)
    }
}