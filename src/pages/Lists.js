import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';

const apiUrl = process.env.REACT_APP_API_URL;
const getCovidDataUrl = apiUrl + 'coviddata?collection=DonneesHospitalieres';

const columnsDonneesHospitalieres = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'dep',
      headerName: 'Departement',
      type: 'number',
      width: 200,
    },
    {
      field: 'jour',
      headerName: 'Jour',
      width: 200,
    },
    {
      field: 'incidHosp',
      headerName: 'Hospitalisations',
      type: 'number',
      width: 200,
    },
    {
      field: 'incidRea',
      headerName: 'Réanimations',
      type: 'number',
      width: 200,
    },
    {
      field: 'incidDc',
      headerName: 'Décés',
      type: 'number',
      width: 200,
    },
    {
      field: 'incidRad',
      headerName: 'Retour a domicile',
      type: 'number',
      width: 200,
    },
  ];

const Lists = () => {
  const [covidData, setCovidData] = useState([]);
  const [columns, setColumnsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const result = await axios.get(getCovidDataUrl);
    setCovidData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    setColumnsData(columnsDonneesHospitalieres);
    fetchData();
  }, []);

  return (
      <div style={{ height: 800, width: '100%' }}>
          <DataGrid loading={loading} rows={covidData} columns={columns} pageSize={100} checkboxSelection />
      </div>
  )
}
export default Lists