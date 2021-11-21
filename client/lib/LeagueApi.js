import React from "react";
import axios from "axios";
import port from "../port";
import { privateKey, summonerUrl, leagueUrl, championMasteryUrl } from "../api";
import { empty } from "../helper";

const LeagueApi = {
  // 기본 유효성 검증을 합니다.
  baseValid: function (param) {
    const loginId = param.loginId;

    const res = { isRes: true, msg: null };

    if (empty(loginId)) {
      res.isRes = false;
      res.msg = "소환사명을 입력해주세요.";
      return res;
    }

    return res;
  },
  // API 에서 소환사 정보를 가져옵니다.
  getSummonerApi: async function ({ loginId }) {
    const res = {
      summonerApi: null,
    };

    const url = `${summonerUrl}${loginId}${privateKey}`;

    await axios({
      method: "GET",
      url: url,
    })
      .then(({ status, data }) => {
        if (status === 200 && !empty(data)) {
          res.summonerApi = data;
        }
      })
      .catch((e) => {});

    return res;
  },
  // API 에서 소환사 티어 정보를 가져옵니다.
  getLeagueApi: async function (id) {
    const res = {
      privateLeague: null,
      teamLeague: null,
    };

    const url = `${leagueUrl}${id}${privateKey}`;

    await axios({
      method: "GET",
      url: url,
    })
      .then(({ status, data }) => {
        if (status === 200 && !empty(data)) {
          data.forEach((row, idx) => {
            switch (row.queueType) {
              default:
                res.teamLeague = row;
                break;

              case "RANKED_SOLO_5x5":
                res.privateLeague = row;

                break;
            }
          });
        }
      })
      .catch((e) => {});

    return res;
  },
  // API 에서 소환사 주챔피언 정보를 가져옵니다.
  getChampionMasteryApi: async function (id) {
    const res = {
      championMasteryApi: [],
    };

    const url = `${championMasteryUrl}${id}${privateKey}`;

    await axios({
      method: "GET",
      url: url,
    })
      .then(({ status, data }) => {
        if (status === 200 && !empty(data)) {
          data.forEach((row, idx) => {
            if (idx > 4) return false;
            res.championMasteryApi.push(row);
          });
        }
      })
      .catch((e) => {});

    return res;
  },

  // API 에서 소환사 정보 중복검증을 합니다
  validSummoner: async function (summoner) {
    const res = { isError: false, isDup: false };
    const summonerName = summoner.name;

    console.log(summonerName);
    await axios({
      method: "GET",
      url: `${port}/getSummonerData`,
      params: {
        summonerName,
      },
    })
      .then(({ status, data }) => {
        console.log(data);
        if (status !== 200) res.isError = true;
        if (!empty(data)) res.isDup = true;
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },

  //
  createSummoner: async function (summonerApi) {
    const res = { isError: false, insertId: 0 };

    await axios({
      method: "GET",
      url: `${port}/createSummoner`,
      params: {
        summonerApi,
      },
    })
      .then(({ status, data }) => {
        if (status == 200) {
          res.insertId = data.insertId;
        }
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },
  createPrivateLeague: async function (privateLeague, insertId) {
    if (empty(privateLeague)) return false;
    const res = { isError: false };

    await axios({
      method: "GET",
      url: `${port}/createPrivateLeague`,
      params: {
        privateLeague,
        insertId,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },
  createTeamLeague: async function (teamLeague, insertId) {
    if (empty(teamLeague)) return false;

    const res = { isError: false };

    await axios({
      method: "GET",
      url: `${port}/createTeamLeague`,
      params: {
        teamLeague,
        insertId,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },
  createChamiponMastery: async function (championMasteryApi, insertId) {
    if (empty(championMasteryApi)) return false;

    const res = { isError: false };

    await axios({
      method: "GET",
      url: `${port}/createChamiponMastery`,
      params: {
        championMasteryApi,
        insertId,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },
  getSummonerAllData: async function (insertId) {
    const res = { isError: false, summoner: null };

    await axios({
      method: "GET",
      url: `${port}/getSummonerAllData`,
      params: {
        insertId,
      },
    })
      .then(({ status, data }) => {
        if (status == 200) {
          console.log(data);
          res.summoner = data;
        }
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },
};

export default LeagueApi;
