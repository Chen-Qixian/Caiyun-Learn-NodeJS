/**
 * index.js  主程序入口
 */
let server = require('./server');  // 服务端
let router = require('./router');  // 路由
let requestHandlers = require('./requestHandlers');  // 请求处理程序

// 将请求处理程序中的方法封装成handle对象传递给server
let handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

// 启动server，传入路由和请求处理方法
server.start(router.route, handle);
