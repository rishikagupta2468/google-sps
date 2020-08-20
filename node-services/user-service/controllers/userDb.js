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
  signup: async (User) => {
    if (!validateEmail(User.email)) {
      throw new Error("Invalid email format");
    }
    
    if (!validateUserParameter(User.name) || !validateUserParameter(User.password) ||
        !validateUserParameter(User.age) || !validateUserParameter(User.gender)
    ) {
      throw new Error("Parameters can't be empty");
    }
    
    const hashedPassword = await bcrypt.hash(User.password, 10);
    const dataObject = {
      'name': User.name,
      'password': hashedPassword,
      'age': User.age,
      'gender': User.gender
    }

    try {
      //Check if user already exists
      const userReference = db.collection('users').doc(User.email); 
      const object = await userReference.get();
      if (object.exists) {
        return { 'responseCode': '0' };
      }

      //Create new user
      const returnedObject = await db.collection('users').doc(User.email).set(dataObject);
      return { 'responseCode': '1' };
    } catch (err) {
      throw new Error(err);
    }
  },

  login: async (User) => {
    try {
      const userReference = db.collection('users').doc(User.email);
      const object = await userReference.get();

      if (object.exists) {
        const dataObject = object.data();
        if (await bcrypt.compare(User.password, dataObject.password)) {
          delete dataObject.password;
          return { 'responseCode': '1', 'userData': dataObject}; //Logs user in
        } else {
            return { 'responseCode': '-1' }; //Wrong password
        }
      } else {
        return { 'responseCode': '0' }; //User doesn't exist
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = dbOperations;