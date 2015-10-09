//Node Modules
var util = require('util');
var moment = require('moment');

//Local Modules
var colour = require('./colours.js');
var settings = require('./settings.js');
var capitalise = require('./utils/capitalise');
var stripColorCodes = require('stripcolorcodes');
var formatTimestamp = require('./utils/formatTimestamp');


var output = function(data, callback) {
    if (typeof data === "object") {
        var a = getTimestamp(data) || "";
        var b = getSeverity(data);
        var c = getSource(data);
        var d = getMessage(data);

        var output = (a + b + c + " " + d + "   ");

        if (settings.output.colour === false) {
            output = stripColorCodes(output);
        }

        if (typeof callback !== "undefined") {
            callback(output);
        } else {
            console.log(output);
        }

    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
};

var getTimestamp = function(data){
    var f = "";
    if (settings.output.timestamp === true) {
        if (typeof data.timestamp !== "undefined") {
            if (typeof settings.timeformat !== "undefined" && settings.timeformat !== "undefined") {
                try {
                    f = moment().format(settings.timeformat);
                } catch (e) {
                    f = moment().format('DD MMM HH:mm:ss');
                }
            } else {
                f = formatTimestamp(data.timestamp);
            }
        } else {
            f = formatTimestamp(new Date());
        }

        if (settings.output.timestampOpts.brackets === true) {
            return "[" + f + "] ";
        } else {
            return f + " ";
        }
    }
};

var getSeverity = function(data){
    if (typeof data.severity !== "undefined") {
        var h = capitalise(data.severity);
        switch (data.severity.toLowerCase()) {
            case 'success':
                return "[" + h.success + "]   ";
                break;
            case 'transport':
                return "[" + h.transport + "] ";
                break;
            case 'debug':
                return "[" + h.debug + "]     ";
                break;
            case 'info':
                return "[" + h.info + "]      ";
                break;
            case 'warning':
                return "[" + h.warning + "]   ";
                break;
            case 'error':
                return "[" + h.error + "]     ";
                break;
            default:
                return "[" + h + "]     ";
        }
    } else {
        return "[" + "undefined".error + "]      ";
    }
};

var getSource = function(data){
    if (typeof data.source !== "undefined"){
        var source = "[" + data.source + "]";
        var sp = 15-source.length;
        for(var i = 0; i< sp; i++) {
            source += ' ';
        } return source;
    } else {
        return "[" + "undefined" + "]	";
    }
};

var getMessage = function(data){
    if (typeof data.message !== "undefined") {
        return data.message;
    } else {
        return "undefined".error;
    }
};

module.exports = output;