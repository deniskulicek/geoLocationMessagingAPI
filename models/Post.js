var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var postSchema = new Schema({
    message:    {type: String, required: true},
    loc:        {type: Object, index: '2dsphere'},
    upvotes:    {type: Number, default: 0},
    downvotes:  {type: Number, default: 0},
    device_id:  {type: String},
    created_at: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model('Post', postSchema);