const got = require('got');
const SPFUrl = "https://www.data.gouv.fr/fr/organizations/sante-publique-france/datasets-resources.csv";

const mongoose = require('mongoose')

const donneesHospitalieresSchema = require('../schemas/donneesHospitalieresSchema');
const DonneesHospitalieres = mongoose.model('DonneesHospitalieres', donneesHospitalieresSchema, 'DonneesHospitalieres');

const donneesTauxDincidenceQuotDep = require('../schemas/donneesTauxDincidenceQuotDepSchema');
const TauxDincidenceQuotDep = mongoose.model('TauxDincidenceQuotDep', donneesTauxDincidenceQuotDep, 'TauxDincidenceQuotDep');

// const testInsert1 = new DonneesHospitalieres({ dep: 50, jour: '1', incidHosp: 1, incidRes: 1, incidDc: 1, incidRad: 1 })
// const testInsert2 = new TauxDincidenceQuotDep({ fra: 50, jour: '1', P_f: 1, P_h: 1, P: 1, pop_f: 1, pop_h: 1, cl_age90: 1, pop: 1 })

const regNewHospitalsDataCovid = /static\.data\.gouv\.fr.*donnees-hospitalieres-nouveaux-covid19/
const regIncidenceRateQuotFraDataCovid = /static\.data\.gouv\.fr.*sp-pe-tb-quot-dep/

const insertData = async (collection, brutData) => {
    const brutDataTab = brutData.split('\n');
    let insertTab = [];
    if(collection === 'DonneesHospitalieres') {
        // We first remove all the information from this collection
        const rmRes = await removeAllData('DonneesHospitalieres');
        // console.log(rmRes);

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
        }

        DonneesHospitalieres.collection.insertMany(insertTab, function (err, data) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple documents inserted to DonneesHospitalieres");
            }
        });

    } else if (collection === 'TauxDincidenceQuotDep') {
        
        // We first remove all the information from this collection
        const rmRes = await removeAllData('TauxDincidenceQuotDep');
        // console.log(rmRes);

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

        // // We first remove all the information from this collection
        // const rmRes = await removeAllData('TauxDincidenceQuotDep');
        // // console.log(rmRes);

        // for(let i=1; i<brutDataTab.length - 1; i++) {
        //     let line = brutDataTab[i].split(';');
        //     console.log(line)
        //     let dep = parseInt(line[0].replace(/['"]+/g, ''));
        //     let jour = line[1];
        //     let P_f = line[2];
        //     let P_h = line[3];
        //     let P = line[4];
        //     let pop_f = line[5];
        //     let pop_h = line[6];
        //     let cl_age90 = line[7];
        //     let pop = line[7];
        //     let parsedLine = '{ "dep": ' + dep + ', "jour": "' + jour + '", "P_f": ' + P_f + ', "P_h": ' + P_h + ', "P": ' + P + ', "pop_f": ' + pop_f + ', "pop_h": ' + pop_h + ', "cl_age90": ' + cl_age90 + ', "pop": ' + pop + ' }';
        //     console.log(parsedLine)
        //     insertTab.push(JSON.parse(parsedLine));
        // }

        // TauxDincidenceQuotDep.collection.insertMany(insertTab, function (err, data) {
        //     if (err){ 
        //         return console.error(err);
        //     } else {
        //       console.log("Multiple documents inserted to TauxDincidenceQuotDep");
        //     }
        // });

    }
    return "ok";
};

const fetchBrutData = async () => {
    try {
        const allLinks = await getAllLinks();
        for (let i=0; i<allLinks.length; i++) {
            let brut = await got(allLinks[i].replace(/['"]+/g, '')).text();
            if(allLinks[i].match(regNewHospitalsDataCovid)) {
                insertData('DonneesHospitalieres', brut);
            } else if (allLinks[i].match(regIncidenceRateQuotFraDataCovid)) {
                insertData('TauxDincidenceQuotDep', brut);
            }
        }
        return "ok";
    } catch (err) {
        console.error(err);
    }
};

const getAllLinks = async () => {
    try {
        const body = await got(SPFUrl).text(); // On récupère ce fichier car il regroupe l'ensemble de tous les autres
        const bodyTab = body.split('\n');

        let newHospitalsDataCovid = [];

        for (let i=0; i<bodyTab.length; i++) {
            // donnees-hospitalieres-relatives-a-lepidemie-de-covid
            if(bodyTab[i].match(regNewHospitalsDataCovid)) { // On cherche par exemple https://static.data.gouv.fr/resources/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/20210214-190659/donnees-hospitalieres-nouveaux-covid19-2021-02-14-19h03.csv
                let lineSplitted = bodyTab[i].split(';');
                for (let j=0; j<lineSplitted.length; j++) {
                    if(lineSplitted[j].match(regNewHospitalsDataCovid)) {
                        newHospitalsDataCovid.push(lineSplitted[j]);
                    }
                }
            // sp-pe-tb-quot-dep
            } else if (bodyTab[i].match(regIncidenceRateQuotFraDataCovid)) {
                let lineSplitted = bodyTab[i].split(';');
                for (let j=0; j<lineSplitted.length; j++) {
                    if(lineSplitted[j].match(regIncidenceRateQuotFraDataCovid)) {
                        newHospitalsDataCovid.push(lineSplitted[j]);
                    }
                }
            }
        }
        return newHospitalsDataCovid;
    } catch (err) {
        console.error(err);
    }
}

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

const getAllData = async (req) => {
    const collection = req.query.collection;
    let data;
    if(collection === "DonneesHospitalieres") {
        data = await DonneesHospitalieres.find();
    } else if(collection === "TauxDincidenceQuotDep") {
        data = await TauxDincidenceQuotDep.find();
    }
    return data;
}

module.exports = {
    fetchBrutData,
    removeAllData,
    getAllData
};
