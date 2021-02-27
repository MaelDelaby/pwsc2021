//Model for the MongoDB Collections
const DonneesHospitalieres = require('../models/donneesHospitalieresModel');
const ReaFranceParJour = require('../models/donneesReaFranceParJourModel');
const TauxDincidenceQuotDep= require('../models/donneesTauxDincidenceQuotDepModel');


const getAllData = async (req) => {
    const collection = req.query.collection;
    let data;
    if(collection === "DonneesHospitalieres") {
        data = await DonneesHospitalieres.find();
    } else if(collection === "ReaFranceParJour") {
        data = await ReaFranceParJour.find();
    } else if(collection === "TauxDincidenceQuotDep") {
        data = await TauxDincidenceQuotDep.find();
    }
    return data;
}

module.exports={
    getAllData
}
