module.exports = fn => (...rest) => {
    Promise.resolve(fn(rest)).catch((err)=> { throw err })
}