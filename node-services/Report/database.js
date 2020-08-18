const Firestore = require('../../../software-product-sprint/node_modules/@google-cloud/firestore');

module.exports = new Firestore({
  projectId: 'summer20-sps-77',
  keyFilename: 'key.json',
});

