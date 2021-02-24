const got = require('got');
const SPFUrl = "https://www.data.gouv.fr/fr/organizations/sante-publique-france/datasets-resources.csv";

const mongoose = require('mongoose')

const donneesHospitalieresSchema = require('../schemas/donneesHospitalieresSchema');
const DonneesHospitalieres = mongoose.model('DonneesHospitalieres', donneesHospitalieresSchema, 'DonneesHospitalieres');

// const testInsert1 = new DonneesHospitalieres({ dep: 50, jour: '1', incidHosp: 1, incidRes: 1, incidDc: 1, incidRad: 1 })

// testInsert1.save(function (err, data) {
//     if (err) return console.error(err);
//     console.log(data.jour + " saved to collection.");
// });

const regNewHospitalsDataCovid = /static\.data\.gouv\.fr.*donnees-hospitalieres-nouveaux-covid19/
const regIncidenceRateQuotFraDataCovid = /static\.data\.gouv\.fr.*sp-pe-tb-quot-dep/

const insertData = async (collection, brutData) => {
    const brutDataTab = brutData.split('\n');
    let insertTab = [];
    if(collection === 'DonneesHospitalieres') {
        for(let i=1; i<brutDataTab.length - 1; i++) {
            let line = brutDataTab[i].split(';');
            let dep = parseInt(line[0].replace(/['"]+/g, ''));
            let jour = line[1];
            let incidHosp = line[2];
            let incidRes = line[3];
            let incidDc = line[4];
            let incidRad = line[5];
            let parsedLine = '{ "dep": ' + dep + ', "jour": "' + jour + '", "incidHosp": ' + incidHosp + ', "incidRes": ' + incidRes + ', "incidDc": ' + incidDc + ', "incidRad": ' + incidRad + ' }';
            
            insertTab.push(JSON.parse(parsedLine));
        }

        DonneesHospitalieres.collection.insertMany(insertTab, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple documents inserted to DonneesHospitalieres");
            }
        });

    } else if (collection === 'TauxDincidenceQuotDep') {

    }
    return "ok";
};

const getBrutData = async () => {
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

module.exports = {
    getBrutData,
};
