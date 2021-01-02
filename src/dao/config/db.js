let firestore;

console.log('loading DB: 1');
// if developing locally, then use key file for service account information
// DEV comes from the .env file and dotenv library if they exist (shouldn't exist in prod)
if (process?.env?.DEV) {
console.log('loading DB: 2');
const Firestore = require('@google-cloud/firestore');
firestore = new Firestore({
  projectId: 'causal-block-97013',
  keyFilename: '/Users/austinhaws/Documents/netbeans/fantasyBracketServiceNodeGQL/causal-block-97013-f43cbf70eeec.json',
});

} else {
console.log('loading DB: 3');
// running as actual GCP Cloud Function so the function already has service-account
const admin = require('firebase-admin');
admin.initializeApp();
firestore = admin.firestore();

}
console.log('loading DB: 4');

export default firestore;
