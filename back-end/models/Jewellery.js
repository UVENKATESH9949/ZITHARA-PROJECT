const mongoose = require('mongoose');

const jewellerySchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  category: String,
  imageUrl: String
});

module.exports = mongoose.model('Jewellery', jewellerySchema);
