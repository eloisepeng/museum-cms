const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CatalogingSchema = new Schema({
  // permanent identification number
  pid: { type: String, required: true },
  name: { type: String, required: true },
  // artist or creator name
  artist: { type: String, default: 'n/a' },
  description: String,
  // unit: cm
  dimension: {
    height: Number,
    length: Number,
    width: Number,
    unit: { type: String, enum: ['m', 'cm', 'mm'], default: 'cm' },
  },
  materials: String,
  condition: { type: String, enum: ['excellent', 'good', 'fair', 'poor'] },
  archaeoSite: String,
  dating: String,
  // preservationHistory: [String],
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
