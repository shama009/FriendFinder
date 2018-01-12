// ===============================================================================
// LOAD DATA
// We are linking our routes to a  "data" source.
// These data source hold arrays of information on friends.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey... this data is then sent to the server...
    // Then the server saves the data to the friendsData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // req.body is available since we're using the body-parser middleware
        var surveyData = req.body;
        var difference = [];
        // use the comparision logic from survey response and send appropriate friendData in response
        // loop through friendsData array and get each of it's object's score values to compare with surveyData object's score values
        // compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference
        // get total difference with each person's data from friendsData array and fnd the one with min totalDifference value to find best match
        for (var i = 0; i < friendsData.length; i++) {
            var totalDifference = 0;
            var diffObj = {};
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                totalDifference += Math.abs(friendsData[i].scores[j] - surveyData.scores[j]);
            }
            diffObj.id = i;
            diffObj.total = totalDifference;
            difference.push(diffObj);
        }
        // Now find the minimum number from difference array's total value that is find min value in array of objects
        var lowest = Number.POSITIVE_INFINITY;
        var tmp;
        var index = 0;
        for (var i = difference.length - 1; i >= 0; i--) {
            tmp = difference[i].total;

            if (tmp < lowest) {
                lowest = tmp;
                index = i;
            }
        }
        // now add new surveyData to friendsData
        friendsData.push(surveyData);
        res.json(friendsData[index]);
    });
};