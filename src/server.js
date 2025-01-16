import http from "http";
import fs from "fs";
import requestIp from "request-ip";


const htmlpage = fs.readFileSync("public/index.html");
console.log("server created")

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlpage);
}).listen(3000)