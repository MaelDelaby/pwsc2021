import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      bottom: 0,
      width: '97%',
      textAlign: 'right',
    },

}));

export default function ShowHowManyCase() {
    const classes = useStyles();

    const [nbOfCase, setNbOfCase] = useState([]);

    const urlForFrance = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";
    const timeoutToRefesh = 1000;

    async function refresh(){
        try {
            const data = await axios.get(urlForFrance);
            return data.data.FranceGlobalLiveData[0].gueris + data.data.FranceGlobalLiveData[0].deces;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setNbOfCase(await refresh());
        };
        fetchData();
        let interval = setInterval(async () => fetchData(), timeoutToRefesh);
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className={classes.root}>
            <p>
                {
                    nbOfCase > 0 ?
                        'Nombre de cas confirmés en france : ' + nbOfCase :
                        'Requete à l\'API coronavirusapi-france.now.sh impossible'
                }
            </p>
        </div>
    );
}