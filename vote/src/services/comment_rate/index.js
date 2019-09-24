var { changeValue, deleteValue, getValue } = require('../../libs/redis_client');

module.exports.getSpecificCommentRate = async function (comment_id) {
    try {
        const label = 'com:app:comment:vote:' + comment_id
        return {
            data: await getValue(label) || [],
            success: true
        }
    } catch (error) {
        return {
            error,
            success: false
        }
    }
}

module.exports.increseCommentRate = async function (comment_id) {
    try {
        const label = 'com:app:comment:vote:' + comment_id
        await changeValue(label, 1);
        return {
            success: true
        }
    } catch (error) {
        return {
            error,
            success: false
        }
    }
}

module.exports.decreseCommentRate = async function (comment_id) {
    try {
        const label = 'com:app:comment:vote:' + comment_id
        await changeValue(label, -1)
        return {
            success: true
        }
    } catch (error) {
        return {
            error,
            success: false
        }
    }
}

module.exports.deleteCommentRate = async function (comment_id) {
    try {
        const label = 'com:app:comment:vote:' + comment_id
        await deleteValue(label)
        return {
            success: true
        }
    } catch (error) {
        return {
            error,
            success: false
        }
    }
}