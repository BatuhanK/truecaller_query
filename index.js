var chalk = require('chalk');
var request = require('request');
/*

Hello :) I'm Batuhan.

If you'll modify this and make it better, please share it with everyone!

-> katircib@gmail.com

*/
function throwError(errorMessage){
    console.log(chalk.red("###### ERROR ######\n") + chalk.red(errorMessage) + chalk.red("\n###### ERROR ######\n"));
    throw new Error(errorMessage);
}


function TrueCaller(myNumber,registerId){
    if(!myNumber || !registerId){
        throwError("TrueCaller initialization error - Please see the guidelines for setup process from our github or npm page.");
    }
    this.myNumber = myNumber;
    this.registerId = registerId;
}

TrueCaller.prototype.search = function(number,callback){
    var queryUrl = "https://search5.truecaller.com/v2/search/?clientId=1&countryCode=tr&q="+number+"&pageSize=1&type=4&myNumber="+this.myNumber+"&registerId="+this.registerId;
    request({
        uri: queryUrl,
        method: 'GET'
    }, function(error,response,body){
        if(error){
            console.log(response);
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


module.exports = {
    api: function(myNumber,registerId){
        return new TrueCaller(myNumber,registerId);
    }
}