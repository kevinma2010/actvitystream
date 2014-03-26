/**
 * @author malongbo
 */

 var mongoose = require('mongoose');

 var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;

 var MediaLinkHash = {
     duration: Number,
     height: Number,
     width: Number,
     url: String
 };

 var LocationHash = {
     displayName: {type: String},
     position: {
         latitude: Number,
         longitude: Number
     }
 };

 var ActivityObjectHash = {
     id: {type: String},
     image: {type: MediaLinkHash, default: null},
     icon: {type: MediaLinkHash, default: null},
     displayName: {type: String},
     summary: {type: String},
     content: {type: String},
     url: {type:String},
     published: {type: String, default: null},
     objectType: {type: String},
     updated: {type: String, default: null},
     location: LocationHash,
     fullImage : {type: MediaLinkHash, default: null},
     thumbnail : {type: MediaLinkHash, default: null},
     author : {type: ObjectId, ref: "activityObject"},
     attachments : [{type: ObjectId, ref: 'activityObject'}],
     upstreamDuplicates : [{type: String, default: null}],
     downstreamDuplicates : [{type: String, default: null}]
 };

 var PersonHash = {
     id: {type: String},
     image: {type: MediaLinkHash, default: null},
     icon: {type: MediaLinkHash, default: null},
     displayName: {type: String},
     summary: {type: String},
     content: {type: String},
     url: {type:String},
     author : {type: ObjectId, ref: "activityObject"},
     published: {type: String, default: Date.now},
     objectType: {type: String, default: 'person'},
     updated: {type: String, default: Date.now},
     location: LocationHash,
     'roles' : [{type: String}],
     'photos' : [{type: ObjectId, ref: 'activityObject'}],
     'streams_followed': [{type: String}]
 };

 var ActivityHash = {
     id: {type: String},
     verb: {type: String, default: 'post'},
     objectType: {type: String, default: 'activity'},
     url: {type: String},
     title: {type: String},
     content: {type: String},
     icon: {type: MediaLinkHash, default: null},
     object: {type: ActivityObjectHash, default: null},
     actor:  {type: ActivityObjectHash, default: null},
     target: {type: ActivityObjectHash, default: null},
     published: { type: String, default: null},
     updated: { type: String, default: null},
     inReplyTo: {type: ObjectId, ref: 'activity'},
     provider: {type: ActivityObjectHash, default: null},
     generator: {type: ActivityObjectHash, default: null},
     streams: [{type: String, default: []}]
 };

 var ActivityStreamHash = {
     activity: {type: ActivityHash},
     status: {type: Number, default:0},
     pushTime: {type:Number, default: new Date().getTime()}
 };

 module.exports = {
     ActivitySchema: new Schema(ActivityHash),
     ActivityObjectSchema: new Schema(ActivityObjectHash),
     PersonSchema: new Schema(PersonHash),
     ActivityStreamSchema: new Schema(ActivityStreamHash)
 };
