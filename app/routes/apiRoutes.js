var friendsData = require("../data/friends.js");


module.exports = function (app) {


  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });


  app.post("/api/friends", function (req, res) {
    // if (friendsData.length) {
    //   // friendsData.push(req.body);
    //   // res.json(true);
    // }
    var bestMatch = {
      name: "",
      photo: "",
      numberDifference: 100
    };
    var userData = req.body;
    var userScores = userData.scores;

    var totalDiff;

    for (var i = 0; i < friendsData.length; i++) {
      // console.log(friendsData[i]);
      var currentFriend = friendsData[i];
      totalDiff = 0;

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
        totalDiff += Math.abs(parseInt(currentFriendScore) - parseInt(currentUserScore));

        console.log(friendsData[i].scores[j]);
      }
      if (totalDiff < bestMatch.numberDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.numberDifference = totalDiff;
        console.log(bestMatch);
      }
      // console.log("hello");
    }
    friendsData.push(userData);
    console.log("Your best Match is " + bestMatch.name + bestMatch.photo);
    res.json(bestMatch);
  });

};