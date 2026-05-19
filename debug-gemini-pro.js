const https = require('https');

const API_KEY = "AIzaSyAMs4e78wUglbX-Z7la2C6PJPyWwNDcokY";
const MODEL = "gemini-pro";

const data = JSON.stringify({
    contents: [{
        parts: [{ text: "Hello" }]
    }]
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${body}`);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
