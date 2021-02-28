//Model for the MongoDB Collections
const DonneesHospitalieres = require('../models/donneesHospitalieresModel');
const ReaFranceParJour = require('../models/donneesReaFranceParJourModel');
const TauxDincidenceQuotDep= require('../models/donneesTauxDincidenceQuotDepModel');
const removeCovidDataController = require('./removeCovidData');


const insertData = async (collection, brutData) => {
    const brutDataTab = brutData.split('\n');
    let insertTab = [];
    if(collection === 'DonneesHospitalieres') {
        // We first remove all the information from this collection
        const rmRes = await removeCovidDataController.removeAllData('DonneesHospitalieres');
        console.log(rmRes);
        let day = brutDataTab[1].split(';')[1];
        let reaADay = 0;
        let reaTab = []
        let reaId = 0;
        for(let i=1; i<brutDataTab.length - 1; i++) {
            let line = brutDataTab[i].split(';');

            let id = i-1;
            let dep = parseInt(line[0].replace(/['"]+/g, ''));
            let jour = line[1];
            let incidHosp = line[2];
            let incidRes = line[3];
            let incidDc = line[4];
            let incidRad = line[5];
            let parsedLine = '{ "id": ' + id + ', "dep": ' + dep + ', "jour": "' + jour + '", "incidHosp": ' + incidHosp + ', "incidRes": ' + incidRes + ', "incidDc": ' + incidDc + ', "incidRad": ' + incidRad + ' }';

            insertTab.push(JSON.parse(parsedLine));

            // To compute the Number of Reanimation in France per Day
            if(day !== jour) {
                let reaLine;
                reaLine = '{ "id": ' + reaId + ', "jour": "' + day + '", "rea": ' + reaADay + ' }' ;
                reaTab.push(JSON.parse(reaLine));

                day = jour;
                reaADay = 0;
                reaId++;
            }
            reaADay = reaADay + parseInt(incidRes);
        }

        DonneesHospitalieres.collection.insertMany(insertTab, function (err, data) {
            if (err){
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to DonneesHospitalieres");
            }
        });

        ReaFranceParJour.collection.insertMany(reaTab, function (err, data) {
            if (err){
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to ReaFranceParJour");
            }
        });

    } else if (collection === 'TauxDincidenceQuotDep') {

        // We first remove all the information from this collection
        const rmRes = await removeCovidDataController.removeAllData('TauxDincidenceQuotDep');
        console.log(rmRes);

        for(let i=1; i<brutDataTab.length - 1; i++) {
            let line = brutDataTab[i].split(';');

            let dep = parseInt(line[0].replace(/['"]+/g, ''));
            let jour = line[1];
            let P = line[2];
            let cl_age90 = parseInt(line[3]);
            let pop = line[4];
            let parsedLine = '{ "dep": ' + dep + ', "jour": "' + jour + '", "P": ' + P + ', "cl_age90": ' + cl_age90 + ', "pop": ' + pop + ' }';

            insertTab.push(JSON.parse(parsedLine));
        }

        TauxDincidenceQuotDep.collection.insertMany(insertTab, function (err, data) {
            if (err){
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to TauxDincidenceQuotDep");
            }
        });
    }
    return "ok";
};

module.exports={
    insertData
}