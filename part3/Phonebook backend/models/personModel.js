require('dotenv').config();

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type : String,
    minlength : 3
  },
  number: {
    type : String,
    minlength : 8,
    validate : {
      validator : function(value){
        return /^\d{2,3}-\d+$/.test(value);
      },
      message : props => `${props.value} is not a valid phone number`
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
