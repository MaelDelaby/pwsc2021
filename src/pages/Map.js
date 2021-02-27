import React, { useEffect, useState } from 'react'
import France from '@socialgouv/react-departements';
import {
  Typography
} from '@material-ui/core';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const getCovidDataUrl = apiUrl + 'coviddata?collection=TauxDincidenceQuotDep&day=1';
const critP = 150;

const Map = () => {
    const [depSelected, setdepSelected] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      const result = await axios.get(getCovidDataUrl);
      let selectedDep = [];
      for(let i=0; i<result.data.length; i++){
        if(result.data[i].P > critP) {
          selectedDep.push(result.data[i].dep)
        }
      }
      setdepSelected(selectedDep);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    return (
        <>
          <Typography>
            Rouge : Incidence supérieure à 150
          </Typography>
            { loading ? 'loading' : 
                <France color="#556cd6" highlightColor="#c80000" departements={depSelected} />
            }
        </>

    )
}
export default Map