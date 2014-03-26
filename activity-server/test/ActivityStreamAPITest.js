/**
 * @author malongbo
 */
var http = require('http');

function testPostActivity () {
    var data = {
        activity:
        "{\"actor\":{\"displayName\":\"lenbo\",\"objectType\":\"person\"},\"object\":{\"displayName\":\"tingting\",\"objectType\":\"person\"},\"objectType\":\"activity\",\"verb\":\"make-friend\"}"
    };

   var param = {
        method: "POST",
        host: "127.0.0.1",
       port: "3000",
       path: "/api/activity",
       headers: {
           "Content_Type": "application/json",
           "Content_Length": data.length
       }
   };

    var req = http.request(param, function (serverFeedback) {
         if (serverFeedback.statusCode == 200) {
             var body = "";
             serverFeedback.on('data',function (data) { body += data})
                 .on('send', function () {res.send(200, body)});
         } else {
             res.send(500, 'error');
         }
    });

    req.write(data + "\n");
    req.end();
}

testPostActivity();