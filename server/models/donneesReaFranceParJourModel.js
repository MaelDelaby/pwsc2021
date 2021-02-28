const mongoose = require('mongoose')

const donneesReaFranceParJourSchema = new mongoose.Schema({
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

let ReaFranceParJourModel = mongoose.model('ReaFranceParJour', donneesReaFranceParJourSchema, 'ReaFranceParJour');


module.exports=ReaFranceParJourModel;

