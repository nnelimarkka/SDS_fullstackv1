const url = require("url");

const myUrl = new URL('http://mywebsite.com/hello.html?id=100&status=active');

//serialized url
console.log(myUrl.href);
console.log(myUrl.toString());

//root domain (host)
console.log(myUrl.host);

//hostname (no port)
console.log(myUrl.hostname);

//path 
console.log(myUrl.pathname);

//url parameters string
console.log(myUrl.search);

//url parameters object
console.log(myUrl.searchParams);

//add parameter
myUrl.searchParams.append("car", "audi");
console.log(myUrl.searchParams);

//loop parameters
myUrl.searchParams.forEach((value, name) => {
    console.log(`${name}: ${value}`);
})

