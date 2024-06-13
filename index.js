//file system
const fs = require("fs");
const http = require("http");

fs.writeFileSync("foo.txt", "Hello from the other siiide");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write(`<html>
            <head><title>Entrer un msg</title></head>
            <body>
                <form action="/message" methode="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>`);

        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'post request');
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
    }
});

server.listen(3000);