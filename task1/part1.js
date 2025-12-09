const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
if (req.method === 'GET' && req.url === '/') {
            res.end('Welcome to the Home Page');
    } 
    else if (req.method === 'GET' && req.url === '/info') {
            res.end('This is the information page');
    } 
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('page not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
