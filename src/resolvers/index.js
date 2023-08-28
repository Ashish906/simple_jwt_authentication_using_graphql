const userQuery = require('./user/user.query')

module.exports = {
    Query: {
        ...userQuery
    },
    Mutation: {}
}