import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label } from 'recharts';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const getCovidDataUrl = apiUrl + 'coviddata?collection=ReaFranceParJour';

export default function Chart() {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const theme = useTheme();

  const fetchData = async (numberOfDays) => {
    const result = await axios.get(getCovidDataUrl);
    let graphData = [];
    for(let i=result.data.length-numberOfDays; i<result.data.length; i++) {
      let line = '{ "jour": "' + result.data[i]['jour'] + '", "rea": ' + result.data[i]['rea'] + ' }';
      graphData.push(JSON.parse(line));
    }
    setCovidData(graphData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(7);
  }, []);

  return (
    <>
      { loading ? 'Loading' : 
        <LineChart
          data={covidData}
          width={850} height={300}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="jour" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Réanimations
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="rea" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>}
    </>
  );
}