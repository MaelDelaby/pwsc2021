const mongoose = require('mongoose')

const ReaFranceParJourSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Id is required']
  },
  jour: {
    type: String,
    required: [true, 'Jour is required']
  },
  rea: {
    type: Number,
    required: [true, 'Rea is required']
  }
})

module.exports = ReaFranceParJourSchema