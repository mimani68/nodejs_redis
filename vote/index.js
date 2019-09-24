require('dotenv').config()

const bodyParser = require('body-parser');

var app = require('express')(),
    {
        getSpecificCommentRate,
        increseCommentRate,
        decreseCommentRate,
        deleteCommentRate
    } = require('./src/services/comment_rate'),
    { Init } = require('./src/libs/redis_client'),
    PORT = require('./src/config/app').config.port

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
    console.log('get votes');
    var comment_id = !Number.isInteger(req.params.comment_id) ? +req.params.comment_id : null;
    if ( comment_id ) {
        getSpecificCommentRate(comment_id).then( result => {
            res.json( result )
        })
    }
})

app.post(['/vote/:comment_id/plus'], (req, res, next)=>{
    try {
        // console.log(typeof(req.body.number));
        var comment_id = !Number.isInteger(req.params.comment_id) ? +req.params.comment_id : null;
        comment_id = req.params.comment_id;
        var number = Number.isInteger(req.body.number) ? +req.body.number : null;
        if ( comment_id && number ) {
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

app.post(['/vote/:comment_id/-'], (req, res, next)=>{
    var comment_id = !Number.isInteger(req.params.comment_id) ? +req.params.comment_id : null;
    var number = !Number.isInteger(req.body.number) ? +req.body.number : null;
    if ( comment_id && number ) {
        decreseCommentRate(comment_id).then( result => {
            res.status(201).json( result )
        }).catch( error => {
            res.status(400).json({
                error,
                success: false
            })
        })
    }
})

app.delete(['/vote/:comment_id'], (req, res, next)=>{
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
})

app.listen(PORT, ()=>{
    console.log(`run fake server on port ${PORT}`)
})