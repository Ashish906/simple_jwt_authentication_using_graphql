import { CustomError } from "../utils/index.js"

export const validateRequiredFields = (data = {}, requiredFields = []) => {
    const notExists = []
    for(const field of requiredFields) {
        if(!data[field]) notExists.push(field)
    }
    if(notExists.length) {
        throw new CustomError(400, `Missing ${notExists.join(', ')}`)
    }
}