const mongoose = require('mongoose')

const donneesTauxDincidenceQuotDepSchema = new mongoose.Schema({
  dep: {
    type: Number,
    required: [true, 'Departement is required']
  },
  jour: {
    type: String,
    required: [true, 'Jour is required']
  },
  P: {
    type: Number,
    required: [true, 'incidHosp is required']
  },
  cl_age90: {
    type: Number,
    required: [true, 'incidRad is required']
  },
  pop: {
    type: Number,
    required: [true, 'incidRad is required']
  }
})

let TauxDincidenceQuotDepModel = mongoose.model('TauxDincidenceQuotDep', donneesTauxDincidenceQuotDepSchema, 'TauxDincidenceQuotDep');

module.exports=TauxDincidenceQuotDepModel;
