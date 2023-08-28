const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.resolve(__dirname, 'user.gql')).toString()

module.exports = `
    ${userSchema}
`