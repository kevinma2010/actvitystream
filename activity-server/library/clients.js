/**
 * @author malongbo
 */

var io = null,
    clients = [];

exports.listen = function (server) {
     io = require('socket.io').listen(server);
     var activityAPI = require("./../routes/ActivityStreamAPI");

    io.sockets.on('connection', function (socket) {
        socket.on('message', function (message) {
            console.debug(message);

            //检测登录
            if (message.logicId == 'login') {
                clients[message.username] = socket; //将用户名与连接对应
                socket.username = message.username;

                //检查未读消息
                var query = {};
                query["activity.object.objectType"] = "person";
                query["activity.object.id"] = message.username;
                query["status"] = 0;
                activityAPI.count(query, function (err, count) {
                    if (!err && count && count > 0) {
                        socket.emit("activity", {
                            type: "count",
                            count: count,
                            message: "您有"+count+"条未读消息"
                        });
                    }
                });
            }
        });
    });
};

/**
 * 向订阅者发布新消息
 * @param username
 * @param actvity
 */
exports.pushActivity = function (username,actvity) {
    if (username && clients[username]) {
        var conn = clients[username];
        conn.emit("activity", {
            type: "new",
            activity: actvity,
            message: "您有1条新消息"
        });
    }
};