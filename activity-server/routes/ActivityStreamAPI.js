/**
 * @author malongbo
 */

var mongoose = require("mongoose"),
    ActivitySchema = require("./../library/ActivityMongoose").ActivityStreamSchema,
    clients = require("./../library/clients"),
    pageBuilder = require("./../library/page/pageBuilder");

var Activity = mongoose.model('Activity', ActivitySchema);

var common = {
    renderError: function (err,res) {
        console.error(err);
        res.json({
            code: 500
        });
    },
    renderSuccess: function (res) {
        res.json({
            code: 1
        });
    }
};

/**
 * 发布一条Activity
 * @param req
 * @param res
 */
exports.postActivity = function (req, res) {
    var activityStr = req.body.activity;

    try {
        var pushTime = new Date().getTime();
        var activity = JSON.parse(activityStr);
        Activity.create({
            activity: activity,
            pushTime: pushTime
        }, function (err, fullActivity) {
            if (err) {
                next(err);
                res.json({
                    code: 0,
                    message: "post error"
                });
                return;
            }

            //向订阅该消息的用户推送消息
            if (fullActivity.object && fullActivity.object.objectType=='person' && fullActivity.object.id) {
                clients.pushActivity(activity.object.id, fullActivity);
            }

            res.json({
                code: 1,
                message: "post success"
            });
        });
    } catch (err) {
        res.json({
            code: 2,
            message: "invalid param activity"
        });
    }
};

exports.updateActivity = function (req, res) {
    var id = req.body.id,
       status = req.body.status;

    if (id && status) {
        Activity.update({_id: id}, {status: status}, function (err) {
             if (err) {
                 next(err);
                 common.renderError(err, res);
                 return;
             } else {
                common.renderSuccess(res);
             }
        });
    }
};

function excludeQueryName (name) {
   if ('id' === name
       || 'currpage' === name
       || '_id' === name
       || '_v' === name
       || 'pagesize' === name
       || 'asc' === name
       || 'mode' === name) {
       return true;
   }
}

/**
 * 计算符合条件的数据量
 * @param query json格式的查询条件
 * @param cb  回调函数，用于返回结果
 */
exports.count = function (query, cb) {
    if (query) {
        Activity.count(query,function (err, count) {
            console.log(count);
             if (cb && typeof cb == 'function') {
                 if (err) return cb(err,null);

                 cb(null,count);
             }
        });
    }
};

/**
 * 简单检索及高级检索功能
 * @param req
 * @param res
 */
exports.searchActivity = function (req, res) {
    var query = req.query;

    var id = query.id,
        mode = query.mode || 'page' //是否返回单条数据,
        asc = query.asc || false ;

    var queryParam = {};

    for (var item in query) {
        if (excludeQueryName(item)) continue;

        queryParam[item] = query[item];
    }

    if (id) queryParam['_id'] = id;

    /*
    检索符合条件的最新一条数据
     */
    if (mode == 'one') {
        Activity.findOne(queryParam,function (err, list) {
            if (err) {
                common.renderError(err,res);
            } else {
                res.json({
                    code: 1,
                    result: list
                });
            }
        });
    } else if (mode === 'page') { //分页检索
        var pageParam = {},
            currpage = query.currpage || 1,
            pagesize = pageParam.pagesize = query.pagesize || 8;

        Activity.count(queryParam,function (err, count) {
            if (err) return common.renderError(err, res);

            /*
            计算分页
             */
            var totalpage = pageParam.total = Math.ceil(count/pagesize);
            currpage = pageParam.currpage = currpage > totalpage ? totalpage : currpage; //判断当前页码是否大于总页码

            var page = pageBuilder.buildPage(pageParam);


            var _search = Activity.find(queryParam);

            if (asc) {
               _search.sort({'pushTime': 0});
            } else {
                _search.sort({'pushTime': 1});
            }

            _search.exec(function (err, list) {
                if (err) {
                    common.renderError(err,res);
                } else {

                    res.json({
                        code: 1,
                        page: page,
                        count: count,
                        list: list
                    });
                }
            });

        });
    }  else if (mode === 'all') {  //检索所有
        var _search = Activity.find(queryParam);

        if (asc) {
            _search.sort({'pushTime': 0});
        } else {
            _search.sort({'pushTime': 1});
        }

        _search.exec(function (err, list) {
            if (err) {
                common.renderError(err,res);
            } else {
                res.json({
                    code: 1,
                    count: list.length,
                    list: list
                });
            }
        });
    } else {
        res.send("");
    }
};
