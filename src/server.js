import http from "http";
import fs from "fs";
import requestIp from "request-ip";

console.log("server created")
const chatLogs = [];

http.createServer((req, res) => {
    const htmlpage = fs.readFileSync("public/index.html");
    console.log(req.url)

    if (req.url == "/firstUser") {
        //build the whole request body
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        //when all data is received them parse the JSON
        req.on('end', () => {
            let obj = JSON.parse(body);
            chatLogs.push(`${obj.name}: ${obj.message}`);
            console.log(chatLogs);
        });

        const dataSendBack = {

        }
        // res.writeHead(200, { 'Content-Type': });

    } else if (req.url == "/styles.css") {
        const csspage = fs.readFileSync("public/styles.css");
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(csspage);
    } else if (req.url == "/bg.jpg") {
        const bgImg = fs.readFileSync("public/assests/bg.jpg");
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(bgImg);
    } else if (req.url == '/app.js') {
        const jspage = fs.readFileSync("src/app.js");
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(jspage);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlpage);
    }
}).listen(3000)