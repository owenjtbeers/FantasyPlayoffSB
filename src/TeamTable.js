import React, { Component, useEffect } from "react";
import _ from "lodash";

import "./TeamTable.css";

export default class TeamTable extends Component {
  render() {
    const { team, owner } = this.props;
    return (
      <div className={"playerTable"}>
        <span>{owner}</span>
        {team
          ? team.map(player => (
              <div className="playerRow">{this.renderPlayerStats(player)}</div>
            ))
          : null}
        {this.renderTotal(team)}
      </div>
    );
  }
  renderPlayerStats(player) {
    const stats = _.get(player, ["info", "stats", 0, "splits", 0, "stat"], {});
    console.log(player);
    console.log(player.info);
    return (
      <>
        <div className="playerName">{player.displayName}</div>
        <div>{`G: ${stats.goals} A: ${stats.assists} P: ${stats.goals +
          stats.assists}`}</div>
      </>
    );
  }

  renderTotal(team) {
    if (team) {
      const goals = _.sum(
        _.map(team, player =>
          _.get(player, ["info", "stats", 0, "splits", 0, "stat", "goals"], 0)
        )
      );
      const assists = _.sum(
        _.map(team, player =>
          _.get(player, ["info", "stats", 0, "splits", 0, "stat", "assists"], 0)
        )
      );

      return (
        <div className="total">
          <div style={{ width: "150px" }}>Total</div>
          {`G: ${goals} A: ${assists} P: ${goals + assists}`}
        </div>
      );
    }
  }
}
