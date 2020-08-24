const db = require('../dbInstance');

const dbOperation = {
  doesUserExist: async (email) => {
    const userReference = db.collection('users').doc(email); 
    const object = await userReference.get();
    if (object.exists) {
      return { 'responseCode': '1' };
    } else {
      return { 'responseCode': '0' };
    }
  }
}

module.exports = dbOperation;