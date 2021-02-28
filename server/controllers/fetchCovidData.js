const got = require('got');
const SPFUrl = "https://www.data.gouv.fr/fr/organizations/sante-publique-france/datasets-resources.csv";
const insertCovidDataController = require('./insertCovidData');

const regNewHospitalsDataCovid = /static\.data\.gouv\.fr.*donnees-hospitalieres-nouveaux-covid19/;
const regIncidenceRateQuotFraDataCovid = /static\.data\.gouv\.fr.*sp-pe-tb-quot-dep/;

const fetchBrutData = async () => {
    try {
        const allLinks = await getAllLinks();
        for (let i=0; i<allLinks.length; i++) {
            let brut = await got(allLinks[i].replace(/['"]+/g, '')).text();
            if(allLinks[i].match(regNewHospitalsDataCovid)) {
                insertCovidDataController.insertData('DonneesHospitalieres', brut);
            } else if (allLinks[i].match(regIncidenceRateQuotFraDataCovid)) {
                insertCovidDataController.insertData('TauxDincidenceQuotDep', brut);
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
            // donnees-hospitalieres-nouveaux-covid19
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

module.exports={
    fetchBrutData
}