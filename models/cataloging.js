const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CatalogingSchema = new Schema({
  // permanent identification number
  pid: { type: String, required: true },
  name: { type: String, required: true },
  // artist or creator name
  artist: String,
  description: String,
  dimension: String,
  materials: String,
  condition: String,
  provenance: String,
  exhibition: String,
  preservationHistory: String,
  acquisitions: { type: Schema.Types.ObjectId, ref: 'Acquisition' },
  location: { type: String, required: true },
  imgUrl: String,
  status: {
    isDeaccessed: { type: Boolean, default: false },
    date: Date,
    reason: String,
    // method of disposal used
    disposalMethod: String,
  },
});

const Cataloging = mongoose.model('Cataloging', CatalogingSchema);

module.exports = Cataloging;
