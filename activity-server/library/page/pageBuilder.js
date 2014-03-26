/**
 * 分页处理
 * User: qgm
 * Date: 12-6-15
 * Time: 上午10:57
 * To change this template use File | Settings | File Templates.
 */
var pagination = require( "./pagination" );
/**
 * 生成分页
 * @param page
 * @param req
 * @param res
 */
exports.buildPage = function(page){
//    console.log('****************************************************/n');
    page = page || {};
    var config = {
        currpage: page.currpage || 1,
        pagesize: page.pagesize || 8,
        pagetotal: page.total || 1
    };

    return pagination.build( config.pagetotal, config.currpage, config.pagesize, 2, 6 );
}