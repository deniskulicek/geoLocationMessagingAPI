var app  = require('../app');
var Post = require('../models/Post');
var SamplePost = require('../models/SamplePost');

var POSTS_PER_PAGE = 5;

var handleOutput = function(req, res, next) {
    return function(err, data) {
        if (err) {
            console.log(err);
            res.send(500, {error: 1, message: res.errorMessage});
        }
        res.send(200,data);
    };
};

var getModel = function(req) {
    if(req.query.sampleflag === undefined){
        return Post;
    } else {
        return SamplePost;
    }
};

exports.list = function(req, res, next) {

    if(req.body.longitude === undefined || req.body.latitude === undefined){
        res.errorMessage = 'Client didn\'t provide [longitude,latitude] parameters in the request.';
        next(new Error(res.errorMessage));
        return;
    }

    page = parseInt(req.body.page,10);

    if(isNaN(page) || page < 1) { //if page parameter is missing from request
        page = 1;
    }

    //set model (post or samplepost) based on sampleflag parameter in request
    var model = getModel(req);

    model.aggregate([
        {
            '$geoNear': {
                near: {
                    type: "Point",
                    coordinates: [
                        parseFloat(req.body.longitude),
                        parseFloat(req.body.latitude)
                    ]
                },
                distanceField: 'distance',
                //distanceMultiplier: 6378137, //not required in mongodb > 2.6
                spherical: true
            }
        },
        {           //0 if lt 0 fix this.. limit/skip brljavi
            '$skip': (page-1)*POSTS_PER_PAGE
        },
        {
            '$limit': POSTS_PER_PAGE
        }
    ], handleOutput(req,res));
};

exports.post = function(req, res, next) {
    new Post(
        {
            loc: {
                type: "Point",
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
            },
            message:    req.body.message,
            device_id:  req.body.device_id
        }).save(handleOutput(req,res));
};

exports.within = function(req, res, next) {

    //set source based on sampleflag parameter
    var model = getModel(req);

    //create array from request
    var points = req.body.points;

    if(points === undefined){
        res.errorMessage = 'Client didn\'t provide boundary points.';
        return next(new Error(res.errorMessage));
    }

    model.find({
        loc: {
            $geoWithin: {
                $geometry: {
                    type: "Polygon",
                    coordinates: points
                }
            }
        }
    }).
    limit(1000).    //limit to 1000 to prevent too big data chunks
    exec(handleOutput(req, res));   //send data

};

module.exports = exports;