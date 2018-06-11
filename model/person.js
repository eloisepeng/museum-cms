const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: { type: String, required: true },
  email: String, 
  address: String,
  phone: { type: String, required: true },
}, { collection : 'users' });

const EmployeeSchema = PersonSchema.extend({
  username: { type: String, required: true, unique: true },
  infos: { type: Schema.Types.ObjectId, ref: 'person' },
  roles: { type: String, enum: ['Admin', 'Inspector'] },
});

const Person = mongoose.model('Person', PersonSchema);
const User = mongoose.model('Employee', UserSchema);

module.exports = Person;