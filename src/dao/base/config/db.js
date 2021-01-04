let firestore;

// if developing locally, then use key file for service account information
// DEV comes from the .env file and dotenv library if they exist (shouldn't exist in prod)
if (process && process.env && process.env.DEV) {
console.log('loading DEV db');
const Firestore = require('@google-cloud/firestore');
firestore = new Firestore({
  projectId: 'causal-block-97013',
  keyFilename: '/Users/austinhaws/Documents/netbeans/rpg generator/cloud-function-data-loader/causal-block-97013-f43cbf70eeec.json',
});

} else {
console.log('loading Prod db');
  // running as actual GCP Cloud Function so the function already has service-account
  const admin = require('firebase-admin');
  admin.initializeApp();
  firestore = admin.firestore();

}

module.exports = firestore;
