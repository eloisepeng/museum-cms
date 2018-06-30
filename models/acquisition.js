const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AcquisitionSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Cataloging' },
  donor: { type: Schema.Types.ObjectId, ref: 'Person' },
  seller: { type: Schema.Types.ObjectId, ref: 'Person' },
  price: Number,
  date: { type: Date, required: true },
  // standard currency USD$
  condictionReport: [{
    inspector: { type: Schema.Types.ObjectId, ref: 'Employee' },
    date: Date,
    condition: String,
    conservationNotes: String,
  }],
});

module.exports = mongoose.model('Acquisition', AcquisitionSchema);
