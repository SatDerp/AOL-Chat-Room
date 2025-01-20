import http from "http";
import fs from "fs";
import requestIp from "request-ip";
import test from "./ratelimit.js";

console.log("server created")

const logs = {
    people: [],
    chatLogs: []
};

console.log(new Date())
http.createServer(async (req, res) => {
    const htmlpage = fs.readFileSync("public/index.html");
    console.log(req.url);
    const clientIp = requestIp.getClientIp(req);

    if (req.url == "/ping") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(logs));
    } else if (req.url == "/PUT") {
        if (!test(clientIp)) {
            return;
        }

        //build the whole request body
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        //when all data is received them parse the JSON
        req.on('end', () => {
            let obj = JSON.parse(body);
            logs.people.push(obj.name);
            logs.people = [...new Set([...logs.people])];
            logs.chatLogs.push(obj);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(logs));
        });
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