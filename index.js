var chalk = require('chalk');
var request = require('request');
var async = require('async');

/*

Hello :) I'm Batuhan.

If you'll modify this and make it better, please share it with everyone!

-> katircib@gmail.com

*/
function throwError(errorMessage){
    console.log(chalk.red("###### ERROR ######\n") + chalk.red(errorMessage) + chalk.red("\n###### ERROR ######\n"));
    throw new Error(errorMessage);
}

var TrueCaller = {};

TrueCaller.setParameters = function(myNumber,registerId){
    if(myNumber && registerId){
        this.myNumber = myNumber;
        this.registerId = registerId;
    }
    return TrueCaller;
}

TrueCaller._registerOne = function(callback){
    var pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    var length = 15;

    var generatedString = "";
    while(generatedString.length<length){
        generatedString += pool[Math.floor(Math.random()*pool.length)];
    }

    TrueCaller.myNumber = generatedString;

    var requestUrl = "https://request3.truecaller.com/?app=uuid&action=check&clientId=1&n=" + generatedString;

    request({
        uri: requestUrl,
        method: 'GET'
    }, function(error,response,body){
        if(error){
            return callback(error);
        }
        return callback();
    })
}

TrueCaller._registerTwo = function(callback){
    var requestUrl = "https://request3.truecaller.com/?myNumber="+TrueCaller.myNumber+"&encoding=json&clientId=1&app=initialize&scope=features&provider=Turkey&operator=AVEA&os=Android5.1.1&os_var=android_phone&package=com.truecaller&client=5.83&screen_width=1440&screen_height=2560&language=tr&buildName=GOOGLE_PLAY&push_provider_id=1&handset=Samsung%20SM-G928C&imsi="+TrueCaller.myNumber.split('').reverse().join('');


    request({
        uri: requestUrl,
        method: 'GET'
    },function(error,response,body){
        if(error){
            return callback(error);
        }
        var responseObj = JSON.parse(body);
        var user_information = responseObj['USER_INFORMATION'];

        if(!user_information){
            return callback(new Error('Register failure to TrueCaller'));
        }

        TrueCaller.registerId = user_information['REGISTER_ID'];
        callback(null,{myNumber:TrueCaller.myNumber,registerId:TrueCaller.registerId});
    })
}


TrueCaller.register = function(callback){
    async.waterfall([
        function(cb){
            TrueCaller._registerOne(cb);
        },
        function(cb){
            TrueCaller._registerTwo(cb);
        }
    ],function(error,data){
        if(error){
            return callback(error);
        }
        return callback(null,data);
    })
}

TrueCaller.search = function(number,callback){
    var queryUrl = "https://search5.truecaller.com/v2/search/?clientId=1&countryCode=tr&q="+number+"&pageSize=1&type=4&myNumber="+TrueCaller.myNumber+"&registerId="+TrueCaller.registerId;
    request({
        uri: queryUrl,
        method: 'GET'
    }, function(error,response,body){
        if(error){
            return callback(new Error('TrueCaller server returned an error, please see the details above.'));
        }

        if(response.statusCode == 400){
            return callback(new Error('TrueCaller initialization error, your parameters are wrong or expired. Please doublecheck!'));
        }
        var responseObject = JSON.parse(body);
        if(responseObject.message){
            return callback(new Error(responseObject.message));
        }
        if(!responseObject.data[0].name){
            return callback(new Error('Number not found, sorry.'));
        }
        return callback(null,responseObject.data[0].name);
    })
}


module.exports = TrueCaller;