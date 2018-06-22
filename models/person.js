const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
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
  createdAt: { type: Date, default: new Date() },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

module.exports = mongoose.model('Person', PersonSchema);
