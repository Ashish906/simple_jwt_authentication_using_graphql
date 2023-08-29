import { authHelper } from "../helpers.js"

export default {
    async login(parent, args, context) {
        const { req } = context
        req.body = args
        return await authHelper.loginToAnAccount(req)
    }
}