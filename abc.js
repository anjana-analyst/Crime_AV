const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const CryptoJS = require('crypto-js');

const app = express();
const port = 3001;

// Connection URL
const url = 'mongodb://localhost:27017/myFIR-LoginRegister';

// Database Name
const dbName = 'myFIR-LoginRegister';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");
});

// Route to fetch data from MongoDB and encrypt it using AES encryption
app.get('/encrypt', function(req, res) {
  const db = client.db(dbName);

  // Get the users collection
  const collection = db.collection('firusers');

  // Find all documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs);

    // Encrypt the data using AES encryption
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(docs), 'secret key 123').toString();

    // Send the encrypted data as the response
    res.send(ciphertext);
  });
});

// Route to decrypt the data using AES decryption
app.get('/decrypt/:ciphertext', function(req, res) {
  // Decrypt the data using AES decryption
  const bytes = CryptoJS.AES.decrypt(req.params.ciphertext, 'secret key 123');
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  // Send the decrypted data as the response
  res.send(plaintext);
});

// Start the server
app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});
