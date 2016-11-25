module.exports = function (name) {

    var levels = {
        'debug': 1,
        'info': 2,
        'warn': 3,
        'error': 4
    };

    var globalLogLevel = global.LOG_LEVEL ? global.LOG_LEVEL : window.LOG_LEVEL ? window.LOG_LEVEL : 'warn';
    var levelId = levels[globalLogLevel];
    if (!levelId) throw new Error('Logger: invalid level');

    var log = function (lvl, msg) {

        if (levels[lvl] < levelId) return;

        msg = new Date().toISOString() + ' - [' + name + '] - ' + msg;

        if (console.hasOwnProperty(lvl) && typeof console[lvl] === 'function') {
            console[lvl](msg);
        } else {
            msg = '<' + lvl + '> ' + msg;
            console.log(msg);
        }
    };

    var logger = {};

    for (var lvl in levels) {
        if (!levels.hasOwnProperty(lvl)) continue;

        (function (lvl) {
            logger[lvl] = function (msg) {
                log(lvl, msg);
            }
        })(lvl);
    }

    return logger;
};