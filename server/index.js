const express = require('express');
const app = express();
const cors = require('cors'); 
//when working with react front end and node back end you need cors
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const TweetModel = require('./models/Tweets');
  

//need midware to accept json
app.use(cors());
app.use(express.json());



/// DATABASE CONNECTION
mongoose.connect(
    "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false", 
    {useNewUrlParser: true }  //need when connecting to mongoose
);


app.post("/addtweet", async (req, res) => {  
    const tweetString = req.body.tweetString;

        const newTweet = new TweetModel({tweetString: tweetString});
        await newTweet.save();
        res.send(newTweet);
});

app.post("/addfriend", async (req, res) => {
    
    const name = req.body.name;
    const age = req.body.age;

     const friend = new FriendModel({ name: name, age: age });
     await friend.save();
     res.send(friend);
});

app.get("/readFriends", async (req, res) => {
    FriendModel.find({}, (err, result) => { 
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/readTweets", async (req, res) => {
    TweetModel.find({}, (err, result) => { 
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", async (req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;

    try{
        await FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge);
            friendToUpdate.save();
        });
    }   catch(err) {
        console.log(err);
    }

    res.send("updated");
});


app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await FriendModel.findByIdAndRemove(id).exec();
    res.send("item deleted!");
});




app.listen(3001, () => {
    console.log("You are connected!");
});

