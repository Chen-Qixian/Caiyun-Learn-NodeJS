/**
 * 路由方法
 * @param {Object} handle 
 * @param {String} pathName 
 * @param {Object} response 
 * @param {Object} request  
 */
function route(handle, pathName, response, request) {
    // 当我们找到该路径时，则交给RH处理
    if(typeof handle[pathName] === 'function') {
        handle[pathName](response, request);
    }
    else {
        console.log("No request handler for :" + pathName);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found!");
        response.end();
    }
}

exports.route = route;
