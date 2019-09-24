
const bodyParser = require('body-parser'),
    app = require('express')(),
    {
        getSpecificCommentRate,
        increseCommentRate,
        decreseCommentRate,
        deleteCommentRate
    } = require('./services/comment_rate'),
    { Init } = require('./libs/redis_client');

app.use(bodyParser.json());
app.use( (req, res, next) => {
Init(next)
})

app.get(['/', '/home', '/ping'], (req, res, next)=>{
res.status(200).json({
    title: 'pong'
})
})

app.get(['/vote/:comment_id'], (req, res, next)=>{
if ( !req.params.comment_id || !Number.isInteger( +req.params.comment_id ) ) {
    res.status(400).json({
        success: false,
        message: 'unavailable comment id'
    })
}
var comment_id = +req.params.comment_id;
getSpecificCommentRate(comment_id).then( result => {
    res.json( result )
})
})

app.post([
    '/vote/:comment_id/incr',
], (req, res, next)=>{
try {
    var comment_id = !Number.isInteger(req.params.comment_id) ? +req.params.comment_id : null;
    if ( comment_id ) {
        increseCommentRate(comment_id).then( result => {
            res.status(201).send( result )
        }).catch( error => {
            res.status(401).json({
                error,
                success: false
            })
        })
    } else {
        res.status(400).end();
    }
} catch (err) {
    res.status(500).end();
    console.log(err);
}
})
app.post([
    '/vote/:comment_id/dcr'
], (req, res, next)=>{
try {
    var comment_id = !Number.isInteger(req.params.comment_id) ? +req.params.comment_id : null;
    if ( comment_id ) {
        decreseCommentRate(comment_id).then( result => {
            res.status(201).send( result )
        }).catch( error => {
            res.status(401).json({
                error,
                success: false
            })
        })
    } else {
        res.status(400).end();
    }
} catch (err) {
    res.status(500).json({
        error: err
    });
}
})

app.delete(['/vote/:comment_id'], (req, res, next)=>{
try {
    var comment_id = !Number.isInteger(req.params.comment_id) ? +req.params.comment_id : null;
    if ( comment_id ) {
        deleteCommentRate(comment_id).then( result => {
            res.status(201).json( result )
        }).catch( error => {
            res.status(400).json({
                error,
                success: false
            })
        })
    }
} catch (err) {
    res.status(500).json({
        error: err
    });
}
})


module.exports = app;