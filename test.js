var TrueCaller = require('truecaller_query');

var whoIsThis = "905079999999";
queryApi = TrueCaller.api("myNumber_PARAMATER","registerId_PARAMETER");

queryApi.search(whoIsThis,function(error,name){
    if(error){
        console.log(error);
    } else{
        console.log(name); // Author of whoIsThis parameter as a string
    }
})