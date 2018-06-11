const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  username: { type: String, required: true, unique: true },
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

module.exports = mongoose.model('Employee', UserSchema);