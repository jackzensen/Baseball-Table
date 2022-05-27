import './App.css';
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { createTheme } from '@mui/material/styles';
// import { common } from '@mui/material/colors';
let api_key = process.env.REACT_APP_API_KEY;
const axios = require('axios');

function App() {


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: common[500],
//     },
//   },
// });
  
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [loadingData,setLoadingData] = useState(false)
  const [api, setApi] = useState('/teams')
  const [name, setName] = useState('')

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

  function doubleClicked(gridCell){
    setName(gridCell.row.name)
    changeApi(gridCell.id);
  }

  function resetButton(){
    changeApi('/teams')
    setName('')
  }
  
  return (
    <div className="App">
      <div className ="trim">
        <div className="inner">
         <div>
         <h1>MLB Team Rosters</h1>
         <p>{name}</p>
         <button onClick={() => resetButton()}>Back to teams</button>
         </div>
          <div style={{ display: 'flex'}}> 

            <DataGrid style={{color:'white', width: "100%", height: "70.5vh" }}
                onRowDoubleClick={(gridCell => doubleClicked(gridCell))}
            columns={columns}
            rows={data}
            sx={{
              height: '30px',
              '& .MuiButtonBase-root': {
                color: 'white',
              },
              '& .MuiTablePagination-selectLabel':{
                color: 'white'
              },
              '& .MuiTablePagination-select':{
                color: 'white'
              },
              '& .MuiTablePagination-displayedRows':{
                color: 'white'
              },
              '& .MuiTablePagination-actions':{
                color: 'white'
              },
            }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

