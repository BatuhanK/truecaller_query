# truecaller_query

A module which provides simple gateway to TrueCaller's query api

## Basic Usage

```js
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

```

## Where to find myNumber and registerId parameters?
You have to proxy an Android or IOS device's TrueCaller requests and extract the parameters. (Recommended tool: **Fiddler2**), **or you can see the instructions at the sample code**.

## Tests?
I have no time to write tests for this, please if you do give us some information.
