/**
 * @returns RedisClientOptions
 * @version 0.0.1
 */
function getOptions() {
    var { host, port } = require('../../config/app').config.redis;
    return { host, port };
}

/**
 * @returns RedisClient
 * @version 0.0.1
 */
function client() {
    return require("redis").createClient(getOptions());
}

/**
 * 
 * @param { function } nextFunction
 * @returns void
 * @version 0.0.1
 */
function Init(nextFunction) {
    client().info(function (err, reply) {
        if ( err ) {
            console.log( err ) 
            process.exit(1);
        }
        if ( reply )
            nextFunction();
    });
}

/**
 * 
 * @param { string } label
 */
async function getValue( label ) {
    let result = new Promise((resolve, reject)=>{
        client().get(label, (err, reply)=>{
            reply ? resolve(reply) : reject(err)
            // process.nextTick(function () {
            //     // Force closing the connection while the command did not yet return
            //     client.end(true);
            //     redis.debug_mode = false;
            // });
        });
    })
    return await result;
}

/**
 * 
 * @param { string } label
 * @param { string } value
 */
async function changeValue( label, value ) {
    let result = new Promise((resolve, reject)=>{
        if ( +value >= 1 ) {
            client().incr(label, (err, reply)=>{
                reply ? resolve(reply) : reject(err)
            });
        } else {
            client().decr(label, (err, reply)=>{
                reply ? resolve(reply) : reject(err)
            });
        }
    })
    return await result;
}

/**
 * 
 * @param { string } label
 */
async function deleteValue( label ) {
    let result = new Promise((resolve, reject)=>{
        client().set(label, null, 'EX', 1, (err, reply)=>{
            reply ? resolve(reply) : reject(err)
        });
    })
    return await result;
}

module.exports = { getValue, changeValue, Init, deleteValue, client }