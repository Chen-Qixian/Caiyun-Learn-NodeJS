/**
 *  请求处理程序（根据路由结果执行相关逻辑代码）
 */

let querystring = require('querystring');
let fs = require('fs');  // 读文件模块
let formidable = require('formidable');  //

/**
 * 当请求为 /或 /start时都将执行该方法
 * @param {Object} response 响应内容
 */
function start(response) {
    // 表单提交跳转到 /upload界面
    let body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload"></input>' +
        '<input type="submit" value="upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

/**
 * 当请求为 /upload 时都将执行该方法
 * @param {Object} response 响应内容
 * @param {Object} request 请求内容
 */
function upload(response, request) {
    console.log("Request Handler 'upload' was called!");
    // 上传图片
    let form = new formidable.IncomingForm();
    console.log("about to parse ...");
    // 重命名并另存该图片
    form.parse(request, function (error, fields, files) {
        console.log("parsing DONE!");
        fs.renameSync(files.upload.path, '/tmp/test.png');
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("##Received image: <br/>");
        response.write("<img src='/show' />");
        response.end();
    })

}

/**
 * 显示图片（<img>标签的src链接）
 * @param {*} response 
 * @param {*} postData 
 */
function show(response, postData) {
    console.log("Request Handler 'show' was called!");
    // 显示该图片
    file = fs.readFile("/tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error);
            response.end();
        }
        else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;
