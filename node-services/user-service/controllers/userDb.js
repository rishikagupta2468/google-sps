const db = require('../dbInstance');
const bcrypt = require('bcrypt');
const { validateEmail, validateUserParameter } = require('./validateParameters');

//Response codes for signup
// 0 -> user already exists
// 1 -> user created successfully 


//Response codes for login
// -1 -> Wrong password
//  0 -> User doesn't exists
//  1 -> User login successful

const dbOperations = {
  signup: async (user) => {
    if (!validateEmail(user.email)) {
      throw new Error("Invalid email format");
    }
    
    if (!validateUserParameter(user.name) || !validateUserParameter(user.password) ||
        !validateUserParameter(user.age) || !validateUserParameter(user.gender)
    ) {
      throw new Error("Parameters can't be empty");
    }
    user.email = user.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const dataObject = {
      'name': user.name,
      'password': hashedPassword,
      'age': user.age,
      'gender': user.gender
    }
    //Check if user already exists
    const userReference = db.collection('users').doc(user.email); 
    const object = await userReference.get();
    if (object.exists) {
      return { 'responseCode': '0' };
    }

    //Create new user
    const returnedObject = await db.collection('users').doc(user.email).set(dataObject);
    return { 'responseCode': '1' };
  },

  login: async (user) => {
    if (user.email) {
      user.email = user.email.toLowerCase();
    }
    const userReference = db.collection('users').doc(user.email);
    const object = await userReference.get();

    if (object.exists) {
      const dataObject = object.data();
      if (await bcrypt.compare(user.password, dataObject.password)) {
        delete dataObject.password;
        return { 'responseCode': '1', 'userData': dataObject}; //Logs user in
      } else {
          return { 'responseCode': '-1' }; //Wrong password
      }
    } else {
      return { 'responseCode': '0' }; //User doesn't exist
    }
  }
}

module.exports = dbOperations;