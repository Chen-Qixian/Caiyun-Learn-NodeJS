/**
 * server.js  服务端
 */
let http = require("http");  // 引入http模块搭建http服务器
let url = require("url");  

/**
 * 启动http服务器方法
 * @param {Function} route router中编写的路由方法
 * @param {Object} handle 请求处理方法
 */
function start(route, handle) {
    // createServer的回调 
    function onRequest(request, response) {
        // 从request中取得访问的路径名     
        let pathName = url.parse(request.url).pathname;

        // 服务器端post数据的方法（分块）
        // let postData = "";
        // console.log("Request for " + pathName + " received!");
        // request.setEncoding("utf8");
        // request.addListener("data", function(postDataChunk) {
        //     postData += postDataChunk;
        //     console.log("Receive post data chunk '" + postData + "'.");
        // })
        // request.addListener("end", function() {
        //     route(handle, pathName, response, postData);
        // })

        // 请求响应交给requestHandlers处理
        route(handle, pathName, response, request);
    }
    // 创建http服务器
    http.createServer(onRequest).listen(8888);
    console.log("Server started!");
}

// 将start方法导出
exports.start = start;
