import './App.css';
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

let api_key = process.env.REACT_APP_API_KEY;
const axios = require('axios');

function App() {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [loadingData,setLoadingData] = useState(false)
  const [api, setApi] = useState('/teams')

  function setTable(res) {
    
    const cols = []

    // Set table for responses longer than 1 value
    if (res.data.length){
      for (var key in res.data[0]){
        cols.push({"field": key, "headerName": key.toUpperCase(), flex:1, minWidth:180}) //Creates object with valid syntax for datagrid
      }
      setData(res.data)
    }

    //Set table for response length 1 (A response of length one is just an object, rather than an array of objects)
    else{
      for (var key in res.data){
        cols.push({"field": key, "headerName": key.toUpperCase(), flex:1, minWidth:125}) //Creates object with valid syntax for datagrid
      }
      var tempo = []
      tempo.push(res.data)
        setData(tempo)
    }
    setColumns(cols)
  }

  function changeApi(value) {
    if (value > 150) {
      setApi('/player/' + value)
    } else if (value > 0 && value < 200) {
      setApi('/teams/' + value + '/players')
    }
    else{
      setApi('/teams')
    }
  }

  useEffect(() => {
    const getBaseballData = async () => {
      try {
        await axios.get(
            'http://brew-roster-svc.us-e2.cloudhub.io/api' + api ,
            {
              timeout: 5000,
              headers: {
                'api-key': `${api_key}`
              },
            })
          .then(res => setTable(res))
          .catch(function (error) {
            console.log(error)
          })
      } catch(e){
        alert("Failed to reach api")
        setTable([])
      }
      setLoadingData(false)
    }
    setLoadingData(true) 
    getBaseballData()
  }, [api])

  return (
    <div className="App">
      <div className ="trim">
        <div className="inner">
         <h1>Baseball Teams and Data</h1>
         <button onClick={() => changeApi('/teams')}>Back to teams</button>
          <div style={{ display: 'flex', height: '78.5%'}}> 
            <DataGrid className="dataTable" style={{color:'white', width: "100%"}}
              onCellDoubleClick={(gridCell => changeApi(gridCell.id))}
            columns={columns}
            rows={data}
            
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
