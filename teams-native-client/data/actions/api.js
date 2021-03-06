import axios from "../axios";

import { setPlayers, editPlayer, removePlayer, addPlayer, resetPlayers, makeTeams } from "./state";

export const getPlayers = () => dispatch => {
  axios.get("/players").then(({ data }) => {
    const players = data;
    dispatch(setPlayers(players));
  });
};

export const postPlayer = (player_name, skill) => dispatch => {
  axios.post("/players", {
    player_name: player_name,
    skill: skill
  }).then(({ data }) => {
    const player = data.data;
    dispatch(addPlayer(player));
  });
};

export const patchPlayer = (id, player_name, skill) => dispatch => {
  axios.patch(`/players/${id}`, {
    player_name: player_name,
    skill: skill
  }).then(({ data }) => {
    const player = data.data;
    dispatch(editPlayer(player));
  });
};

export const deletePlayer = (id) => dispatch => {
  axios.delete(`/players/${id}`).then(() => {
    dispatch(removePlayer(id));
  });
};

export const deletePlayers = () => dispatch => {
  axios.delete("/players").then(() => {
    dispatch(resetPlayers());
  });
};

export const assignTeams = () => dispatch => {
  axios.get("/players/teams").then(({ data }) => {
    const players = data
    dispatch(makeTeams(players));
  });
};
