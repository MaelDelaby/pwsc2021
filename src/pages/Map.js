import React, { useEffect, useState } from 'react'
import France from '@socialgouv/react-departements';
import {
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const getCovidDataUrl = apiUrl + 'coviddata?collection=TauxDincidenceQuotDep&day=1';
const critP = 150;

const Map = () => {
    const [depData, setDepData] = useState([]);
    const [depSelected, setDepSelected] = useState([]);
    const [locationData, setLocationData] = useState('');
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      const result = await axios.get(getCovidDataUrl);
      setDepData(result.data);
      let selectedDep = [];
      for(let i=0; i<result.data.length; i++){
        if(result.data[i].P > critP) {
          selectedDep.push(result.data[i].dep)
        }
      }
      setDepSelected(selectedDep);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    const getLocation = async () => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(showPosition);
      }
    }

    const showPosition = async (position) => {
      console.log("Get location")
      const departmentUrl = "https://geo.api.gouv.fr/communes?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&fields=departement&format=json&geometry=centre"
      const departmentInfo = await axios.get(departmentUrl)
      
      let line = '';
      let i=0;
      while (i<depData.length && line == '') {
        console.log(i)
        if(depData[i].dep === parseInt(departmentInfo.data[0].departement.code)) {
          line = "Votre département : " + departmentInfo.data[0].departement.nom + ' (' + departmentInfo.data[0].departement.code + ') a pour taux d\'incidence P : ' + depData[i].P;
        }
        i++;
      }
      setLocationData(line)
    }

    return (
        <>
          <Typography>
            Rouge : Incidence supérieure à {critP}
          </Typography>
            { loading ? <CircularProgress /> : 
              <>
                <France color="#556cd6" highlightColor="#c80000" departements={depSelected} />
                <Typography>
                  Cliquez sur le bouton ci-dessous pour accéder à l'incidence de son département :
                </Typography>
                <Typography>
                  { locationData === '' ? <Button onClick={getLocation}>Récupérer l'information pour mon département</Button> : locationData }
                </Typography>
              </>
            }
        </>

    )
}
export default Map