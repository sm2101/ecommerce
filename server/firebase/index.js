
var admin = require("firebase-admin");

var serviceAccount = require("../config/aura-26-firebase-adminsdk-v97t9-6e374bc27d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin; 
