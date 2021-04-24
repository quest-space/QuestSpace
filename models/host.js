// Host Schema model 

//Require Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define a schema
const Schema = mongoose.Schema;

const hostSchema = new Schema({
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
  passwordlength: {
    type: Number,
    required: [true, 'Password length is required'],
    min: [7, 'Password should be atleast 7 characters long']
  },
  organization: {
    type: String ,
    required: [true, 'Organization is required']
  },
  phone: {
    type: String,
    validate: [/^\+?\d(?:[\d-]*\d)?$/, 'Phone Number is not valid'],
    required: [true, 'Phone number is required']
  },
  representativeName: {
    type: String,
    validate: [/^[A-Za-z ]+$/, 'Name should have alphabets or spaces only'],
    required: [true, 'Representative Name is required']
  },
  representativeDesignation: {
    type: String,
    required: [true, 'Representative Designation is required']
  },
  rating: {
    type: Number,
    default: 3,
    min: 0,
    max: 5,
    required: [true, 'Host rating is required']
}
});

// fire a function before doc saved to db
hostSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
hostSchema.statics.login = async function(username, password) {
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
module.exports = mongoose.model('host', hostSchema);