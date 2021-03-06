const mongoose = require('mongoose')

const donneesHospitalieresSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Id is required']
  },
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


let DonneesHospitalieresModel = mongoose.model('DonneesHospitalieres', donneesHospitalieresSchema, 'DonneesHospitalieres');

module.exports=DonneesHospitalieresModel;
