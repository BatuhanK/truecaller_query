var TrueCaller = require('./index');
queryApi = TrueCaller.api("myNumber_PARAMATER","registerId_PARAMETER");
queryApi.search("QUERY_NUMBER",function(error,name){
    if(error){
        console.log(error);
    } else{
        console.log(name);
    }
})