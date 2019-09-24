/**
 * @returns RedisClient
 * @version 0.0.1
 */
async function client( ) {
    return require("redis").createClient(getOptions());
}

/**
 * @returns RedisClientOptions
 * @version 0.0.1
 */
function getOptions() {
    var { host, port } = require('../../config/app').config.redis;
    return { host, port }
}
/**
 * @returns void
 * @version 0.0.1
 */
function Init(nextFunction) {
    var client = require("redis").createClient( getOptions() );
    console.log(client.get('com:app:comment:vote:12'));

    client.info(function (err, reply) {
        if ( reply )
            nextFunction();
    });

    client.on("error", function (err) {
        console.log("Error " + err);
    });
}

/**
 * 
 * @param { string } label
 */
async function getValue( label ) {
    const client = require("redis").createClient(getOptions());
    return client.get(label);
    // client( ).get(label);
}

/**
 * 
 * @param { string } label
 * @param { string } value
 */
async function changeValue( label, value ) {
    const client = require("redis").createClient(getOptions());
    client.set(label, value );
    // client().set(label, value );
}

/**
 * 
 * @param { string } label
 */
async function deleteValue( label ) {
    client().set(label, null, 'EX', 1 );
}

module.exports = { getValue, changeValue, Init, deleteValue, client }