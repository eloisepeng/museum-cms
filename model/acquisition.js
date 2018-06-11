const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcquisitionSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Cataloging' },
  donor: { type: Schema.Types.ObjectId, ref: 'Person'},
  seller: { type: Schema.Types.ObjectId, ref: 'Person'},
  date: { type: Date, required: true },
  // standard currency USD$
  price: Number,
  condictionReport: [{
    inspector: { type: Schema.Types.ObjectId, ref: 'Employee'},
    date: Date,
    condiction: String,
    conservationNotes: String,
  }],
});

const Acquisition = mongoose.model('Acquisition', AcquisitionSchema);

module.exports = Acquisition;