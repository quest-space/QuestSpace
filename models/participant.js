// Participant Schema model 

//Require Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define a schema
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  username: {
    type: String,   
    required: [true, 'Username is required'], 
    unique: [true, 'Username has already been taken'] 
  },
  password: {
    type: String,
    required: [true, 'Password is required'], 
    minlength: [7, 'Password should be atleast 7 characters long'] 
  },
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    validate: [/^[A-Za-z]+$/, 'First name should have alphabets only']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    validate: [/^[A-Za-z]+$/, 'Last name should have alphabets only']
  },
  organization: {
    type: String,
    required: [true, 'Organization is required']
  }
});

// fire a function before doc saved to db
participantSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
participantSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error(`frd234sf,password,Incorrect password.,${password}`);
  }
  throw Error(`frd234sf,username,Username not found.,${username}`);
};

//Export function to create "hostSchema" model class
module.exports = mongoose.model('participants', participantSchema);