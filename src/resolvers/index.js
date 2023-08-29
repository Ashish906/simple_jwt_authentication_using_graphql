import authQuery from './auth/auth.query.js'
import userQuery from './user/user.query.js'

export default {
    Query: {
        ...authQuery,
        ...userQuery
    },
    Mutation: {}
}