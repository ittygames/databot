var slackAPI = require('slackbotapi');
var config = require("./config.json");
$loadedbots = null;


// Starting
var slack = new slackAPI({
    'token': config.token,
    'logging': config.logging,
    'autoReconnect': config.autoReconnect
});


// Slack on EVENT message, send data.
slack.on('message', function (data) {
    // If no text, return.
    if (typeof data.text == 'undefined') return;

    // If the first character starts with %, you can change this to your own prefix of course.
    if (data.text.charAt(0) === '%') {

        //set up variables
        $botName = "";
        $indexKeeper = "";
        $command1 = "";
        $inputstring = "";
        $command2 = "";

       //standard formats are:
       // %<botname> <action 1> <optional action2, determined by leading {> {data}

        // Split the command and into its parts
        $indexKeeper = 1;
        $botName = data.text.substring($indexKeeper,  data.text.indexOf(" ", $indexKeeper));

        $indexKeeper =  data.text.indexOf(" ", $indexKeeper) + 1;

        if (!(data.text.charAt($indexKeeper) === '{')) {
            $command1 = data.text.substring($indexKeeper,  data.text.indexOf(" ", $indexKeeper));
            $indexKeeper =  data.text.indexOf(" ", $indexKeeper) + 1;
        }

        //if the next character isnt a { attempt to set the second command
        if (!(data.text.charAt($indexKeeper) === '{')) {
            $command2 = data.text.substring($indexKeeper,  data.text.indexOf(" ", $indexKeeper));
            $indexKeeper =  data.text.indexOf(" ", $indexKeeper) + 1;
        }

        $inputString = (data.text.substring($indexKeeper,  data.text.length)).trim();

        $inputData = eval('(' + '[' + $inputString + ']' + ')');

        console.log($botName);
        console.log($indexKeeper);
        console.log($command1);
        console.log($inputstring);
        console.log($command2);


        if(getBotConfigByName($botName)) {
            $botObject = require("./bots/" + (getBotConfigByName($botName)).botfile);
            if ((getBotConfigByName($botName)).enabled) {
                $botObject.doAction(slack,data,getBotConfigByName($botName),$command1, $command2,$inputData)
            }
        }

        // Switch to check which bot has been requested.
           }
});

function  getBotConfigByName($inName){
    for($bot in config.bots){
        if($bot == $inName) {
            return config.bots[$bot];
        }
    }
    return null;
}