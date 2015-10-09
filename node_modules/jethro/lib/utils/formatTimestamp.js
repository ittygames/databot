var formatTimestamp = function(a) {
    var date = a;
    var milliseconds = date.getMilliseconds();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var str = '';
    str += hours < 10 ? '0' : '';
    str += hours + ':';
    str += minutes < 10 ? '0' : '';
    str += minutes + ' ';
    str += seconds < 10 ? '0' : '';
    str += seconds + 's ';
    str += milliseconds < 100 ? '0' : '';
    str += milliseconds < 10 ? '0' : '';
    str += milliseconds + 'ms';
    return str;
};

module.exports = formatTimestamp;