const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
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
  role: { type: String, enum: ['Admin', 'Inspector'] },
  createdAt: { type: Date, default: new Date() },
});

EmployeeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Employee', EmployeeSchema);
