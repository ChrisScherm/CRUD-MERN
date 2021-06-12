const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    tweetString: {
        type: String,
        required: true,
    },
    // date: {
    //     // created: {type: Date, default: Date.now},
    //     required: false,
    // }
    // may need to convert dates to local time
});

const TweetModel = mongoose.model('tweets', TweetSchema)


module.exports = TweetModel;

