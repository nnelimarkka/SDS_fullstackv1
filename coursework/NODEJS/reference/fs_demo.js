const path = require("path");
const fs = require("fs");

//mkdir
/*
fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
    if(err) throw err;
    console.log("Dir created...");
});
*/

//write file and append 
/*
fs.writeFile(path.join(__dirname, "/test", "hello.txt"), "Hello world!\n", (err) =>{
    if(err) throw err;

    console.log("file written...");

    fs.appendFile(path.join(__dirname, "/test", "hello.txt"), "I love Node.js", (err) => {
        if(err) throw err;
        console.log("File append...");
    });
});
*/

//read files
fs.readFile(path.join(__dirname, "/test", "hello.txt"), "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
});

//rename files
fs.rename(path.join(__dirname, "/test", "hello.txt"), path.join(__dirname, "/test", "helloWorld.txt"), (err) => {
    if(err) throw err;
    console.log("file renamed...");
});