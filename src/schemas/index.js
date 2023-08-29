import fs from 'fs'

const authSchema = fs.readFileSync('src/schemas/auth.gql').toString()
const userSchema = fs.readFileSync('src/schemas/user.gql').toString()

export default `
    ${authSchema}
    ${userSchema}
`