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
    type: String,
    required: [true, 'incidHosp is required']
  },
  incidRes: {
    type: String,
    required: [true, 'incidRes is required']
  },
  incidDc: {
    type: String,
    required: [true, 'incidDc is required']
  },
  incidRad: {
    type: String,
    required: [true, 'incidRad is required']
  }
})

module.exports = donneesHospitalieresSchema