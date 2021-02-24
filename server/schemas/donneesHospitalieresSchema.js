const mongoose = require('mongoose')

const donneesHospitalieresSchema = new mongoose.Schema({
  dep: {
    type: Number,
    required: [true, 'Departement is required']
  },
  jour: {
    type: String,
    required: [true, 'Jour is required']
  },
  incidHosp: {
    type: Number,
    required: [true, 'incidHosp is required']
  },
  incidRes: {
    type: Number,
    required: [true, 'incidRes is required']
  },
  incidDc: {
    type: Number,
    required: [true, 'incidDc is required']
  },
  incidRad: {
    type: Number,
    required: [true, 'incidRad is required']
  }
})

module.exports = donneesHospitalieresSchema