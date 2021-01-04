require('dotenv').config();
const { https } = require('firebase-functions');
const { expressServer } = require('./src/server/server');

// if running locally in dev, then keep server running
if (process && process.env && process.env.DEV) {
    const port = 9031;
    expressServer.listen(port);
    console.log(`http://localhost:${port}`);
}

exports.api = https.onRequest(expressServer);
