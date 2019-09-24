
module.exports.config = {
    port: process.env.PORT || 3000,
    redis: {
        host: '127.0.0.1',
        port: '6379',
    }
}