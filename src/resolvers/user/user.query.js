module.exports = {
    sayHello(parent, args, context) {
        console.log('context', context)
        return 'Hi, hello to my new jouney'
    }
}