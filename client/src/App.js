import './App.css';
import { useState, useEffect } from "react"; 
import Axios from 'axios';


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);



  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", 
    {name: name, age: age,})
    .then((response) => {
      setListOfFriends([...listOfFriends, {_id: response.data._id, name: name, age: age}]);
    });
  };

  const updateFriend = (id) =>{
    const newAge = prompt("Enter new age: ");

    Axios.put("http://localhost:3001/update", { newAge: newAge, id: id }).then(()=> {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id == id ? {_id: id, name: val.name, age: newAge} : val
      }))
    })
  };

  const deleteFriend = (id) => {
    //use ` because it allows us to pass javascript variables through the url
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
    setListOfFriends(listOfFriends.filter((val) => {
      return val._id != id; 
    }))
    });
  }

  const [tweetString, setTweetString] = useState("");
  const [listOfTweets, setListOfTweets] = useState([]);

  const addTweet = () => {
    Axios.post("http://localhost:3001/addtweet",
    {tweetString: tweetString,})
    .then((response) => {
      setListOfTweets([...listOfTweets, {_id: response.data._id, tweetString: tweetString}]);
    });
  }

  //fetches tweets/posts
  useEffect(() => {
    Axios.get("http://localhost:3001/readTweets")
      .then((response) => {
        setListOfTweets(response.data);
      })
      .catch(() => { 
        console.log("ERROR");
      });
  }, []);

// fetches friend list
  useEffect(() => {
    Axios.get("http://localhost:3001/readFriends")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => { 
        console.log("ERROR");
      });
  }, []);

  const [showFriends, setShowFriends] = useState(true); //use with show / hide friends buttons
  const [showTweets, setShowTweets] = useState(true); //use with show / hide tweets buttons

  return (
    <div className="App">
    <div class="floatContainer">
      <div class="floatTitles" id="friendTitle"><h2>Add Friends</h2></div>
      <div class="floatTitles" id="tweetTitle"><h2>Post Tweets</h2></div>
      <div className="friendInputs">
        <input type="text" 
        placeholder="Friend name..." 
        onChange={(event) => {setName(event.target.value)}}
        />

        <input type="number" 
        placeholder="Friend age..." 
        onChange={(event) => {setAge(event.target.value)}}
        />

        <button className="friendsButton" onClick={addFriend}>Add Friend</button>
        <button className="friendsButton" onClick={() => setShowFriends(true)}>Show Friends</button>
        <button className="friendsButton" onClick={() => setShowFriends(false)}>Hide Friends</button>
      </div>

      <div className="tweetInputs">
      <input type="text" 
        placeholder="Post/Tweet Here..." 
        onChange={(event) => {setTweetString(event.target.value)}}
        />
      <button className="tweetButton" onClick={addTweet}>Post Tweet</button>
      </div>

    </div>
    
    <div class="floatContainer">
      <div id = "showFriends" className="listOfFriends">
        {listOfFriends.map((val) => {
          if (showFriends) {
             return (
          <div className="friendContainer">
              <div className="friend"> 
                <h3>Name: {val.name}</h3>
                <h3> Age: {val.age}</h3> 
              </div> 
              <button 
                onClick={() => {updateFriend(val._id);}} >
              Update
              </button>
              <button id="removeBtn" onClick={() => {
                deleteFriend(val._id);
                }}>X</button>
            </div>
          );}
          
        })}
      </div>
      <div id = "showTweets" className="listOfTweets">
        {listOfTweets.map((val) => {
          if (showTweets) {
             return (
          <div className="tweetContainer">
              <div className="tweet"> 
                <h4>{val.tweetString}</h4>
              </div> 
              {/* <button 
                onClick={() => {updateFriend(val._id);}} >
              Update
              </button>
              <button id="removeBtn" onClick={() => {
                deleteFriend(val._id);
                }}>X</button> */}
            </div>
          );}
          
        })}
        
      </div>
    </div>

        
    </div>
  );
}

export default App;
