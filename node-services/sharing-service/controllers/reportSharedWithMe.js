const db = require('../dbInstance');
const { validateEmail, validateUserParameter } = require('./validateParameters');

const dbOperations = {
  shareWithMe : async (reportObject) => {
    if (!validateEmail(reportObject.email)) {
      throw new Error("Invalid email");
    }
    if (!validateUserParameter(reportObject.id) || !validateUserParameter(reportObject.reportOwner)
        || !validateUserParameter(reportObject.description)) {
      throw new Error("Invalid parameter");
    }
    const collectionReference = db.collection('sharedWithMe');
    const userReference = collectionReference.doc(reportObject.email);
    const maxTries = 5;
    tryRequest = async (currentAttempt, delay) => {
      try {
        await userReference.collection('reports').add({
          reportId: reportObject.id,
          reportDescription: reportObject.description,
          reportOwner: reportObject.reportOwner
        });
      } catch (err) {
        if (currentAttempt <= maxTries) {
          setTimeout(async () => {
            await tryRequest(currentAttempt + 1, delay * 2);
          }, delay);
        }
        throw err;
      }
    }
    await tryRequest(1, 50);
  }
}

module.exports = dbOperations;