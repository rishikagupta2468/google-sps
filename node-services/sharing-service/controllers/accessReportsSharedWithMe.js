const db = require('../dbInstance');
const { validateEmail, validateUserParameter } = require('./validateParameters');

const dbOperations = {
  accessReports: async(user) => {
    if (!validateEmail(user.email)) {
      throw new Error("Invalid email");
    }
    const collectionReference = db.collection('sharedWithMe');
    const userReference = collectionReference.doc(user.email);
    const snapShot = await userReference.collection('reports').get();
    let reports = [];
    snapShot.forEach(doc => {
      reports.push(doc.data());
    });
    const responseObject = {
      responseCode: '1',
      reports
    }
    return responseObject;
  }
}

module.exports = dbOperations;