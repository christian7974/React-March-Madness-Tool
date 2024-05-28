import './App.css';
import { useEffect, useState } from 'react';

import Autocomplete from "@mui/material/Autocomplete";
import { TextField, createTheme, ThemeProvider } from "@mui/material";


import Quicksand from './Quicksand/Quicksand-VariableFont_wght.ttf'
import schoolNames from "./allTeams.js";
import properStats from './allStats.js';

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
  }, overrides: { 
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Quicksand],
      },
    },
  }

});

function App() {
  const [team1, updateTeam1] = useState("Rhode Island");
  const [team2, updateTeam2] = useState("Gonzaga");

  const [team1Data, updateTeam1Data] = useState({});
  const [team2Data, updateTeam2Data] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (team1 !== null && team2 !== null) {
      setLoading(true); 
      var team1Name = team1.replace(/ /g, "_").toLowerCase();
      var team2Name = team2.replace(/ /g, "_").toLowerCase();
      fetch(`https://college-basketball-api.onrender.com/teams/compare/${team1Name}/${team2Name}`)
      .then (response => response.json())
      .then((json) => {
        updateTeam1Data(json[1]);
        updateTeam2Data(json[0]);
        setLoading(false);
      })
    }
    
  }, [team1, team2]);

  return (
    <ThemeProvider theme={theme}>
    <div className="App font-quicksand" style={{height: 'fit-content'}}>
      <h1 className='flex mx-auto w-fit text-3xl'>March Madness Tool</h1>
      <p className='flex mx-auto w-fit text-xl mt-4'>Select two teams to compare their statistics</p>
        <div className='flex flex-col space-y-4 lg:space-x-4 sm:space-y-0 justify-between w-fit mx-auto mt-4 sm:flex-row sm:mt-10'>
          <Autocomplete
            disablePortal
            id="team1"
            options={schoolNames}
            value={team1}
            onChange={(event, newValue) => {
              updateTeam1(newValue);
            }}
            sx={{ width: 300,}}
            renderInput={(params) => <TextField {...params} label="Select Team 1" />}
          />
          <Autocomplete
            disablePortal
            id="team2"
            options={schoolNames}
            value={team2}
            onChange={(event, newValue) => {
              updateTeam2(newValue);
            }}
            sx={{ width: 300, fontFamily: 'Quicksand'}}
            renderInput={(params) => <TextField {...params} label="Select Team 2" />}
          />
        </div>
        {loading ? (
          <p className='flex mx-auto w-fit text-3xl mt-5'>Loading...</p>
        ) : (
            <table className='bg-slate-50 mx-auto text-center my-2 text-lg font-semibold'>
              <thead>
                <tr className='text-slate-900 text-2xl bg-slate-400'>
                  <th className='w-1/3'>Stat</th>
                  <th className='w-1/3'>{team1}</th>
                  <th className='w-1/3'>{team2}</th>
                </tr>
              </thead>
              <tbody>
                {team1Data && team2Data && Object.keys(properStats).slice(1).map((key) => {
                  return (
                    <tr key={key}>
                      <td className='text-slate-900'>{properStats[key]}</td>
                      <td style={{backgroundColor: team1Data[key] > team2Data[key] ? '#3CB371' : '#B22222'}}>{team1Data[key]}</td>
                      <td style={{backgroundColor: team1Data[key] < team2Data[key] ? '#3CB371' : '#B22222'}}>{team2Data[key]}</td>
                    </tr>)
                })}
              </tbody>
            </table>
        )}

    </div>
    </ThemeProvider>
  );
}

export default App;
