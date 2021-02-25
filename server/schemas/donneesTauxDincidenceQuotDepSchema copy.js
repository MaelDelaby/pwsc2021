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
  P_f: {
    type: Number,
    required: [true, 'incidHosp is required']
  },
  P_h: {
    type: Number,
    required: [true, 'incidRes is required']
  },
  P: {
    type: Number,
    required: [true, 'incidDc is required']
  },
  pop_f: {
    type: Number,
    required: [true, 'incidRad is required']
  },
  pop_h: {
    type: Number,
    required: [true, 'incidRad is required']
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

module.exports = donneesTauxDincidenceQuotDepSchema