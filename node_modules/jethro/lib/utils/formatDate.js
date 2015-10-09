var formatDate = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var str = '';
    str += year + '-';
    str += month < 10 ? '0' : '';
    str += month + '-';
    str += day < 10 ? '0' : '';
    str += day;
    return str;
};

module.exports = formatDate;