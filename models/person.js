const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
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
  countryCode: { type: String },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Doner', 'Seller'] },
  createdAt: { type: Date, default: new Date() },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

module.exports = mongoose.model('Person', PersonSchema);
