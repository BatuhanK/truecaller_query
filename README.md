# truecaller_query

A module which provides simple gateway to TrueCaller's query api

## Basic Usage

```js
var TrueCaller = require('truecaller_query');

var whoIsThis = "905079999999";
queryApi = TrueCaller.api("myNumber_PARAMATER","registerId_PARAMETER");

queryApi.search(whoIsThis,function(error,name){
    if(error){
        console.log(error);
    } else{
    	console.log(name); // Author of whoIsThis variable as a string
    }
})
```

## Where to find myNumber and registerId parameters?
You have to proxy an Android or IOS device's TrueCaller requests and extract the parameters. (Recommended tool: **Fiddler2**)

## Tests?
I have no time to write tests for this, please if you do give us some information.
