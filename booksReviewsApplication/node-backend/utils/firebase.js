const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://book-review-83549-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

module.exports = admin;
