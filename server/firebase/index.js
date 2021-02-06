
var admin = require("firebase-admin");

var serviceAccount = require("../config/ecom-42b8b-firebase-adminsdk-muiax-573045e9b6.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin; 
