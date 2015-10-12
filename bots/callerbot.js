var https = require('https');


exports.doAction = function($slack, $slackData, $bot, $command1, $command2, $botData)
    {
    // correctly align the json data to first in array
    $botData = $botData[0];

        try {
            $data = $botData.data;
            $method = $botData.method;
            $host = $botData.host;

            if($host.charAt(0) == "<"){
                $host = $host.substring(1);
            }

            if($host.charAt($host.length -1) == ">"){
                $host = $host.substring(0, $host.length - 1);
            }

        } catch (e) {
            return null;
        }

        try {
            $headers = $botData.headers;
        } catch (e) {
            $headers ={
                'Content-Type' : 'application/json',
                'Content-Length' : JSON.stringify($data).length
            };
        }

        try {
            $port = $botdata.port;
        } catch (e) {
            $port = 443;
        }

        try {
            $path = $botdata.path;
        } catch (e) {
            $path = "";
        }

        try {
            $dumpHeaders = $botData.dumpHeaders;
        } catch (e) {
            $dumpHeaders = false;
        }
        try {
            $dumpResponse = $botData.dumpResponse;
        } catch (e) {
            $dumpResponse = true;
        }

        switch($method){

            case "POST":
                var optionspost = {
                    host : $host,
                    method : $method,
                    headers : $headers
                };

                var reqPost = https.request(optionspost, function(res) {

                    if(res.statusCode == 200){
                        console.log('looks like the request was a success');
                    }else{
                        console.log('looks like the request wasnt a success');
                        console.log("statusCode: ", res.statusCode);
                    }

                    if($dumpHeaders){
                        console.log("headers: ", res.headers)
                    }

                    res.on('data', function(dataReturned) {
                        console.log(dataReturned);
                    });
                });

                break;

            case "GET":


                break;

            default:


                break;
        }

    }





