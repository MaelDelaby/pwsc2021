//Model for the MongoDB Collections
const DonneesHospitalieres = require('../models/donneesHospitalieresModel');
const ReaFranceParJour = require('../models/donneesReaFranceParJourModel');
const TauxDincidenceQuotDep= require('../models/donneesTauxDincidenceQuotDepModel');


const getAllData = async (req) => {
    const collection = req.query.collection;
    let data;
    if(collection === "DonneesHospitalieres") {
        data = await DonneesHospitalieres.find().sort({id:-1});
    } else if(collection === "ReaFranceParJour") {
        data = await ReaFranceParJour.find().sort({id:-1});
    } else if(collection === "TauxDincidenceQuotDep") {
        data = await TauxDincidenceQuotDep.find();
    }
    return data;
}

const getHospitalieresData = async(req)=>{
    let data;
    let query = {};

    (req.query.dep) ? (query.dep=parseInt(req.query.dep)) : "";
    (req.query.jour) ? (query.jour=req.query.jour) : "";

    data = await DonneesHospitalieres.find(query);
    return data;
}


const getReaFranceParJourData = async(req)=>{
    let data;
    let query = {};
    (req.query.jour) ? (query.jour=req.query.jour) : "";
    data = await ReaFranceParJour.find(query);
    return data;
}

const getTauxDincidenceQuotDepData = async(req)=>{
    let data;
    let query = {};
    (req.query.dep) ? (query.dep=parseInt(req.query.dep)) : "";
    (req.query.jour) ? (query.jour=req.query.jour) : "";
    data = await TauxDincidenceQuotDep.find(query);
    return data;
}




module.exports={
    getAllData,
    getHospitalieresData,
    getReaFranceParJourData,
    getTauxDincidenceQuotDepData
}
