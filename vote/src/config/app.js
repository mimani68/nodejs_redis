
module.exports.config = {
    port: process.env.PORT || 3000,
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        user: process.env.REDIS_USER || '',
        password: process.env.REDIS_PASS || '',
        port: process.env.REDIS_PORT || '6379'
    }
}