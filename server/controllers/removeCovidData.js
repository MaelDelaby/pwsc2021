//Model for the MongoDB Collections
const DonneesHospitalieres = require('../models/donneesHospitalieresModel');
const TauxDincidenceQuotDep= require('../models/donneesTauxDincidenceQuotDepModel');


const removeAllData = async (collection) => {
    let rmRes;
    if(collection === "DonneesHospitalieres") {
        rmRes = await DonneesHospitalieres.remove({}, function (err, data) {
            if (err){
                return console.error(err);
            } else {
                console.log("All Donnees Hospitalieres have been successfully removed.");
            }
        });
    } else if(collection === "TauxDincidenceQuotDep") {
        rmRes = await TauxDincidenceQuotDep.remove({}, function (err, data) {
            if (err){
                return console.error(err);
            } else {
                console.log("All Donnees Taux Dincidence Quotidien par Departement have been successfully removed.");
            }
        });
    }
    return rmRes;
}

module.exports={
    removeAllData,

}