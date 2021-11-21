import { empty } from "../helper";
import port from "../port";
import { privateKey, summonerUrl, leagueUrl } from "../api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = {
  /*
  [
    {
        "leagueId": "2463331a-b1a5-4487-9fbb-c28cd27017df",
        "queueType": "RANKED_FLEX_SR",
        "tier": "SILVER",
        "rank": "II",
        "summonerId": "ApSZ413vUp1Rn4LxnZK677m-11gbASIy5tu2nO5u9Ecb8A",
        "summonerName": "피터파커",
        "leaguePoints": 81,
        "wins": 21,
        "losses": 13,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": false
    },
    {
        "leagueId": "0086ecb5-068b-464f-af58-400c8e5a8599",
        "queueType": "RANKED_SOLO_5x5",
        "tier": "PLATINUM",
        "rank": "IV",
        "summonerId": "ApSZ413vUp1Rn4LxnZK677m-11gbASIy5tu2nO5u9Ecb8A",
        "summonerName": "피터파커",
        "leaguePoints": 0,
        "wins": 405,
        "losses": 381,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": falsegetSummoner
    }
]
  */
  getSearchSetting: async function (loginUserSeq) {
    const res = { isError: false, searchSettingDB: null };

    await axios({
      method: "GET",
      url: `${port}/getSearchSetting`,
      params: {
        loginUserSeq,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
        else res.searchSettingDB = data;
      })
      .catch((e) => {
        console.log(e);
        res.isError = true;
      });

    return res;
  },

  getSummoner: async function (id) {
    const res = { isError: false, summonerDB: null };

    await axios({
      method: "GET",
      url: `${port}/getSummoner`,
      params: {
        id,
      },
    })
      .then(({ status, data }) => {
        console.log(data);
        if (status !== 200) res.isError = true;
        else res.summonerDB = data;
      })
      .catch((e) => {
        console.log(e);
        res.isError = true;
      });

    return res;
  },

  saveSummonerLeaguePrivate: async function (
    { tier, rank, summonerName, leaguePoints, wins, losses },
    insertId
  ) {
    const res = { isError: false };
    await axios({
      method: "GET",
      url: `${port}/saveSummonerLeaguePrivate`,
      params: {
        tier,
        rank,
        summonerName,
        leaguePoints,
        wins,
        losses,
        insertId,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
      })
      .catch((e) => {
        alert(e);
        res.isError = true;
      });
  },

  saveSummonerLeagueTeam: async function (
    { tier, rank, summonerName, leaguePoints, wins, losses },
    insertId
  ) {
    await axios({
      method: "GET",
      url: `${port}/saveSummonerLeagueTeam`,
      params: {
        tier,
        rank,
        summonerName,
        leaguePoints,
        wins,
        losses,
        insertId,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
      })
      .catch((e) => {
        alert(e);
        res.isError = true;
      });
  },

  validSummoner: async function (summoner) {
    const res = { isError: false, isDup: false };
    const summonerName = summoner.name;
    await axios({
      method: "GET",
      url: `${port}/getSummonerData`,
      params: {
        summonerName,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) res.isError = true;
        if (!empty(data)) res.isDup = true;
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },

  getSummonerLeagueApi: async function (id) {
    const url = `${leagueUrl}${id}${privateKey}`;
    const res = { isError: false, summonerData: null };
    await axios({
      method: "GET",
      url: url,
    })
      .then(({ status, data }) => {
        console.log(data);

        if (status !== 200) res.isError = true;
        else res.summonerData = data;
      })
      .catch((e) => {
        res.isError = true;
      });

    return res;
  },

  createUser: async function ({ level, summonerId, nickname }) {
    let insertId;

    await axios({
      method: "GET",
      url: `${port}/createUser`,
      params: {
        level,
        summonerId,
        nickname,
      },
    })
      .then(({ status, data }) => {
        console.log(data.insertId);
        insertId = data.insertId;
      })
      .catch((e) => {
        res.isError = true;
      });

    return insertId;
  },

  createSummoner: async function (summoner) {
    let isError = false;

    axios({
      method: "GET",
      url: `${port}/createSummoner`,
      params: {
        summoner,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) isError = true;
      })
      .catch((e) => {
        isError = true;
      });

    return isError;
  },

  setStorageUser: async function (loginUser) {
    try {
      await AsyncStorage.setItem("loginUser", JSON.stringify(loginUser));
    } catch (err) {
      alert(err);
    }
  },

  getStorageUser: async function () {
    let loginUser;
    try {
      loginUser = await AsyncStorage.getItem("loginUser");
      console.log(`???? `);
    } catch (err) {
      alert(err);
    }

    return JSON.parse(loginUser);
  },

  joinValid: function (param) {
    const loginId = param.loginId;
    const loginPw = param.loginPw;

    const res = { isRes: true, msg: null };

    // 특수문자
    const patterSpc = /[~!@#$%^&*()_+|<>?:{}]/gi;

    // 한글체크
    const patterKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;

    const validProc = [1];

    for (let i = 0; i <= 0; i++) {
      if (patterKor.test(loginId) || patterSpc.test(loginId)) {
        res.isRes = false;
        res.msg = "아이디를 정확히 입력해주세요";
        break;
      }

      if (patterKor.test(loginPw)) {
        res.isRes = false;
        res.msg = "비밀번호를 정확히 입력해주세요";
        break;
      }

      if (loginId.length < 3) {
        res.isRes = false;
        res.msg = "아이디를 3글자 이상 입력해주세요";
        break;
      }

      if (loginPw.length < 5) {
        res.isRes = false;
        res.msg = "비밀번호를 5글자 이상 입력해주세요";
        break;
      }
    }

    return res;
  },

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

  getDoJoin: async function (param) {
    const loginId = param.loginId;
    const loginPw = param.loginPw;

    const res = {
      isRes: true,
      msg: null,
    };

    await axios({
      method: "POST",
      url: `${port}/getDoJoin`,
      params: {
        loginId,
        loginPw,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) {
          res.isRes = false;
          res.msg = "네트워크 오류";
        }
      })
      .catch((e) => {
        res.isRes = false;
        res.msg = "네트워크 오류";
      });

    return res;
  },

  getDupId: async function (id) {
    const res = {
      isRes: false,
      msg: null,
    };

    await axios({
      method: "POST",
      url: `${port}/getOnlyUserId`,
      params: {
        id,
      },
    })
      .then(({ status, data }) => {
        if (status === 200 && !empty(data)) {
          res.isRes = true;
          res.msg = "동일한 닉네임이 존재합니다.";
        }
      })
      .catch((e) => {
        console.log(`getDupId => ${e}`);
      });

    return res;
  },

  getData: async function ({ loginId }) {
    const res = {
      isLogined: false,
      summoner: null,
    };

    const url = `${summonerUrl}${loginId}${privateKey}`;

    await axios({
      method: "GET",
      url: url,
    })
      .then(({ status, data }) => {
        if (status === 200 && !empty(data)) {
          res.isLogined = true;
          res.summoner = data;
        }
      })
      .catch((e) => {});

    return res;
  },
};

export default User;
