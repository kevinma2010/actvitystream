/**
 * @author malongbo
 */

var mongoose = require("mongoose");

var activity = require("./../library/ActivityMongoose"),
    ActivitySchema = activity.ActivitySchema;
//var b = require("./exportsTest");

var makeFriendActivity = {
    "actor" :{
        "displayName":"lenbo",
        "objectType":"person"
    },
    "object":{
        "displayName":"tingting",
        "objectType":"person"
    },
    "objectType":"activity",
    "verb":"make-friend"
};

var ActivityObject = mongoose.model('ActivityObject', ActivitySchema);
var activityObj = new ActivityObject(makeFriendActivity);
//
console.log(activityObj);

//console.log(b.a);