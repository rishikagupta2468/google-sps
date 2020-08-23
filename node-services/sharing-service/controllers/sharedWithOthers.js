const db = require('../dbInstance');
const { validateEmail, validateUserParameter } = require('./validateParameters');

const dbOperations = {
  checkIfExists : async (reportObject) => {
    if (!validateEmail(reportObject.email)) {
      throw new Error("Invalid email");
    }
    if (!validateUserParameter(reportObject.id)) {
      throw new Error("Invalid parameter");
    }
    const collectionReference = db.collection('sharedWithOthers');
    const reportSnapshot = await collectionReference
        .where('reportId', '==', reportObject.id).get();
    if (reportSnapshot.empty) {
      const docRef = await collectionReference.add({
        reportId: reportObject.id
      });
      return { responseCode: '0' }
    }
    let docId;
    reportSnapshot.forEach(doc => {
      docId = doc.id;
    });
    const userSnapshot = await collectionReference.doc(docId)
        .collection('users').where('email', '==', reportObject.email).get();
    if (userSnapshot.empty) {
      return { responseCode: '0' }
    }
    return { responseCode: '1' }
  }
  ,shareWithOthers : async (reportObject) => {
    const collectionReference = db.collection('sharedWithOthers');
    const reportSnapshot = await collectionReference
        .where('reportId', '==', reportObject.id).get();
    let docId;
    reportSnapshot.forEach(doc => {
      docId = doc.id;
    });
    const maxTries = 5;
    tryRequest = async (currentAttempt, delay) => {
      try {
        const userRef = await collectionReference.doc(docId).collection('users').add({
            email: reportObject.email
        });
      } catch (err) {
        if (currentAttempt <= maxTries) {
          setTimeout(async () => {
            await tryRequest(currentAttempt + 1, delay * 2);
          }, delay);
        }
        throw error;
      }
    }
    await tryRequest(1, 50);
  }
}

module.exports = dbOperations;