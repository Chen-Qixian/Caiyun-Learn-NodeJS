/**
 * 仅用于调试
 */
(function (exports, require, module, __filename, __dirname) {
    var a = 1;
    var b = 'world';
    var c = function (x) {
        console.log('hello ' + x + a);
    }
    c(b);
})