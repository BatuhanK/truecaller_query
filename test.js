// If you have parameters run it like that.
var TrueCaller = require('./index');
TrueCaller.setParameters("myNumber_PARAMATER","registerId_PARAMETER");

var whoIsThis = "905079999999";

TrueCaller.search(whoIsThis,function(err,data){
    console.log(err ? err : data); // your query result is here.
})

// # END



// If you dont have parameters, just run the code below and obtain one.
var TrueCaller = require('./index');
TrueCaller.register(function(err,data){
    console.log(err ? err : data); // your parameters is here.
});


// # END



