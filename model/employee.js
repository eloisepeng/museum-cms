const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: String, 
  address: {
    num: Number, 
    street: String, 
    city: String, 
    province: String, 
    country: String,
    zip: String, 
  },
  phone: { type: String, required: true },
  roles: { type: String, enum: ['Admin', 'Inspector'] },
});

EmployeeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Employee', UserSchema);