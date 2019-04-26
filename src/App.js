import React, { useState, useEffect } from "react";
import "./App.css";
import teams from "./teams.json";

import TeamTable from "./TeamTable";

const API = "https://statsapi.web.nhl.com/api/v1/people";
function App() {
  const state = teams.reduce((acc, team) => {
    acc[team.owner] = team.roster;
    return acc;
  }, {});
  const [data, setData] = useState({ ...state });

  useEffect(() => {
    async function fetchData(owner, playerId) {
      const result = await fetch(
        [
          API,
          playerId,
          "stats?stats=statsSingleSeasonPlayoffs&season=20182019"
        ].join("/"),
        {
          mode: "cors",
          method: "GET"
        }
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(responseData) {
          const newData = data[owner];
          const index = newData.findIndex(player => player.id === playerId);
          newData[index] = { ...newData[index], info: responseData };
          setData({
            ...data,
            [owner]: newData
          });
        });
    }
    teams.map(team =>
      team.roster.map(player => fetchData(team.owner, player.id))
    );
  }, []);

  return (
    <div className="App">
      <div className="Title">
        Welcome to the Farmer's Edge Fantasy Hockey Scoreboard 2019
      </div>
      <div className="Teams">
        {Object.keys(data).map(owner => (
          <React.Fragment>
            <TeamTable team={data[owner]} owner={owner} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
