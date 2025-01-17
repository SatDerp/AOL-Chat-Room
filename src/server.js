import http from "http";
import fs from "fs";
import requestIp from "request-ip";

console.log("server created")

http.createServer((req, res) => {
    const htmlpage = fs.readFileSync("public/index.html");
    console.log(req.url)
    if (req.url == "/styles.css") {
        const csspage = fs.readFileSync("public/styles.css");
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(csspage);
    } else if (req.url == "/bg.jpg") {
        const bgImg = fs.readFileSync("public/assests/bg.jpg");
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(bgImg);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlpage);
    }
}).listen(3000)