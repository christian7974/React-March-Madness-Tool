import './App.css';
import { useEffect, useState } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import schoolNames from "./allTeams.js";

function App() {
  // const [teamData, updateTeamData] = useState({});
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
    <div className="App">
              <>
                <Autocomplete
                  disablePortal
                  id="team1"
                  options={schoolNames}
                  value={team1}
                  onChange={(event, newValue) => {
                    updateTeam1(newValue);
                  }}
                  sx={{ width: 300, marginBottom: 10}}
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
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Select Team 2" />}
                />
                <h1>Team 1 is {team1}</h1>
                <h1>Team 2 is {team2}</h1>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <table style={{backgroundColor: 'red'}}>
                    <tbody>
                      {team1Data && team2Data && Object.keys(team1Data).map((key) => {
                        return (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{team1Data[key]}</td>
                            <td>{team2Data[key]}</td>
                          </tr>)
                      })}
                    </tbody>
                  </table>
                )}
                
              </>
  </div>
  );
}

export default App;
