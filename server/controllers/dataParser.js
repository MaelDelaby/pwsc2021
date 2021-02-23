const got = require('got');
const SPFUrl = "https://www.data.gouv.fr/fr/organizations/sante-publique-france/datasets-resources.csv";

const mongoose = require('mongoose')
const donneesHospitalieresSchema = require('../schemas/donneesHospitalieresSchema');
const DonneesHospitalieres = mongoose.model('DonneesHospitalieres', donneesHospitalieresSchema, 'DonneesHospitalieres');

const testInsert1 = new DonneesHospitalieres({ dep: 50, jour: 'jour', incidHosp: 'incidHosp', incidRes: 'incidRes', incidDc: 'incidDc', incidRad: 'incidRad' })

testInsert1.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data.jour + " saved to collection.");
});

const regNewHospitalsDataCovid = /static\.data\.gouv\.fr.*donnees-hospitalieres-nouveaux-covid19/
const regIncidenceRateQuotFraDataCovid = /static\.data\.gouv\.fr.*sp-pe-tb-quot-dep/

const insertData = async () => {
    const data = await getBrutData()
    for(let i=0; i<data.length; i++) {
        // data[i][1]
    }
    return data[1][1];
};

const getBrutData = async () => {
    try {
        let parsedData = [];
        const allLinks = await getAllLinks();
        for (let i=0; i<allLinks.length; i++) {
            let brut = await got(allLinks[i].replace(/['"]+/g, '')).text();
            let line = [allLinks[i], brut];
            parsedData.push(line);
        }
        return parsedData;
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
    insertData,
};
