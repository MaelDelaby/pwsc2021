import React, { useState } from 'react';
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

    function refresh(){
        axios.get(urlForFrance)
        .then(data => {
                setNbOfCase(data.data.FranceGlobalLiveData[0].casConfirmes);
            }
        )
        .catch(
            err=>console.log(err)
        )
    }

    setInterval(refresh, timeoutToRefesh);



    return (
        <div className={classes.root}>
            <p>
                Nombre de cas confirmés en france : {nbOfCase}
            </p>
        </div>
    );
}