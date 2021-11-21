import React from "react";
import { Image, View, Text } from "react-native";
import axios from "axios";
import port from "../port";
import { empty } from "../helper";
import { position } from "styled-system";
import io from "socket.io-client";

const socket = io(port);

const LeagueOfLegends = {
  saveSearchSetting: async function ({
    gameStyle,
    searchPosition,
    myPosition,
    loginUserSeq,
  }) {
    const res = { isError: false, insertId: 0 };

    await axios({
      method: "post",
      url: `${port}/saveSearchSetting`,
      params: {
        gameStyle,
        searchPosition,
        myPosition,
        loginUserSeq,
      },
    })
      .then(({ status, data }) => {
        if (status == 200) res.insertId = data.insertId;
        else res.isError = true;
      })
      .catch((e) => {
        alert(e);
      });

    return res;
  },

  sendChatMsg: async function ({ loginUserSeq, roomSeq, msg }) {
    let insertId = null;

    await axios({
      method: "get",
      url: `${port}/sendChatMsg`,
      params: {
        loginUserSeq,
        roomSeq,
        msg,
      },
    })
      .then(({ status, data }) => {
        insertId = data.insertId;
      })
      .catch((e) => {});

    return insertId;
  },

  getNewMsg: async function (insertId) {
    let newMsg;

    await axios({
      method: "get",
      url: `${port}/getNewMsg`,
      params: {
        insertId,
      },
    })
      .then(({ status, data }) => {
        newMsg = data;
      })
      .catch((e) => {
        alert(e);
      });

    return newMsg;
  },

  getChatMsgAll: async function (roomSeq) {
    const res = { isError: false, msgAllDB: null, msg: null };

    await axios({
      method: "get",
      url: `${port}/getChatMsgAll`,
      params: {
        roomSeq,
      },
    })
      .then(({ status, data }) => {
        res.msgAllDB = data;
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
      });

    return res;
  },

  updateAttendUser: async function ({ loginUserSeq, attendUserSeq, roomSeq }) {
    const res = {
      isError: false,
      msg: null,
    };

    if (attendUserSeq.includes(`${loginUserSeq}/`)) {
      return;
    }

    const updateSeq = `${attendUserSeq}${loginUserSeq}/`;

    await axios({
      method: "POST",
      url: `${port}/updateAttendUser`,
      params: {
        updateSeq,
        roomSeq,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) {
          res.isError = true;
          res.msg = "네트워크 에러";
        }
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
        console.log(`updateAttendUser ==> ${e}`);
      });

    return res;
  },

  getRoomDetail: async function (roomSeq) {
    const res = {
      isError: false,
      msg: null,
      row: null,
    };

    await axios({
      method: "GET",
      url: `${port}/getDuoRoomDetail`,
      params: {
        roomSeq,
      },
    })
      .then(({ status, data }) => {
        if (status === 200) {
          res.row = data;
        } else {
          res.isError = true;
          res.msg = "네트워크 에러";
        }
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
        console.log(`getDuoChat ==> ${e}`);
      });

    return res;
  },
  getDuoChat: async function (roomSeq) {
    const res = {
      isError: false,
      msg: null,
      row: null,
    };

    await axios({
      method: "GET",
      url: `${port}/getDuoChat`,
      params: {
        roomSeq,
      },
    })
      .then(({ status, data }) => {
        if (status === 200) {
          res.row = data;
        } else {
          res.isError = true;
          res.msg = "네트워크 에러";
        }
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
        console.log(`getDuoChat ==> ${e}`);
      });

    return res;
  },

  getInsertRoom: async function (insertSeq) {
    const res = {
      isError: false,
      msg: null,
      row: null,
    };

    await axios({
      method: "GET",
      url: `${port}/getInsertRoom`,
      params: {
        insertSeq,
      },
    })
      .then(({ status, data }) => {
        if (status === 200) {
          res.row = data;
        } else {
          res.isError = true;
          res.msg = "네트워크 에러";
        }
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
        console.log(`getInsertRoom ==> ${e}`);
      });

    return res;
  },

  validDuoRoom: function ({
    title,
    rankType,
    roomPerson,
    myPosition,
    gameStyle,
    sumSeq,
  }) {
    const res = {
      isError: false,
      msg: null,
    };

    for (let i = 0; i <= 0; i++) {
      if (empty(sumSeq)) {
        res.isError = true;
        res.msg = "로그인 후 이용해주세요";
        break;
      }
      if (empty(title)) {
        res.isError = true;
        res.msg = "제목을 입력해주세요";
        break;
      }
    }

    return res;
  },

  getReMainPosition: function (attendPositionArray) {
    const positionVo = ["top", "jg", "mid", "ad", "sup"];

    const reMainPosition = positionVo.filter((position, key) => {
      const attendPosition = !empty(attendPositionArray[key])
        ? attendPositionArray[key]
        : null;

      return attendPosition === position ? false : true;
    });

    return reMainPosition;
  },

  createDuoRoom: async function (insertData) {
    const res = {
      isError: false,
      msg: null,
      insertSeq: null,
    };

    await axios({
      method: "POST",
      url: `${port}/createDuoRoom`,
      params: {
        insertData,
      },
    })
      .then(({ status, data }) => {
        console.log(data);
        if (status === 200) {
          res.insertSeq = data.insertId;
        } else {
          res.isError = false;
          res.msg = "네트워크 오류";
        }
      })
      .catch((e) => {
        res.isError = false;
        res.msg = "네트워크 오류";
      });

    return res;
  },

  getTierImg: function ({ tier }) {
    var tier = tier.toLowerCase();
    let imgComponent = "";

    switch (tier) {
      case "challenger":
        imgComponent = (
          <Image source={require("../assets/tier/challenger.png")} />
        );

        break;
    }

    return imgComponent;
  },

  getTierName: function (tier) {
    var tier = tier.toLowerCase();

    const vo = {
      challenger: "챌린저",
      grandMaster: "그랜드 마스터",
      master: "마스터",
      diamond: "다이아",
      platinum: "플래티넘",
      gold: "골드",
      silver: "실버",
      bronze: "브론즈",
      iron: "아이언",
    };

    return !empty(vo[tier]) ? vo[tier] : null;
  },

  getPositionName: function (position) {
    const vo = {
      TOP: "탑",
      MIDDLE: "미드",
      JUNGLE: "정글",
      ADC: "원딜",
      SUPPORT: "서포터",
    };

    return !empty(vo[position]) ? vo[position] : null;
  },

  getPosition: function (position) {
    const vo = {
      top: "탑",
      mid: "미드",
      jg: "정글",
      ad: "원딜",
      sup: "서포터",
    };

    return !empty(vo[position]) ? vo[position] : null;
  },

  getRankType: function (rankType) {
    const vo = {
      private: "개인/2인랭",
      team: "팀랭",
      normal: "일반",
    };

    return !empty(vo[rankType]) ? vo[rankType] : null;
  },

  getGameStyle: function (gameStyle) {
    let code;

    if (gameStyle >= 0 && gameStyle <= 30) code = "enjoy";
    else if (gameStyle >= 30 && gameStyle <= 50) code = "middle";
    else code = "hard";

    const vo = {
      enjoy: "재밌게",
      middle: "중간",
      hard: "빡겜",
    };

    return !empty(vo[code]) ? vo[code] : null;
  },

  getDuoRoom: async function () {
    const res = {
      isError: false,
      msg: null,
      list: [],
    };

    await axios({
      method: "GET",
      url: `${port}/getDuoRoom`,
    })
      .then(({ status, data }) => {
        if (status === 200) {
          res.list = data;
        } else {
          res.isError = true;
          res.msg = "네트워크 에러";
        }
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
      });

    return res;
  },

  getDuoRoomAll: async function ({ loginUserSeq }) {
    const res = {
      isError: false,
      msg: null,
      list: [],
    };

    await axios({
      method: "GET",
      url: `${port}/getDuoRoomAll`,
      params: { loginUserSeq },
    })
      .then(({ status, data }) => {
        if (status === 200) {
          res.list = data;
        } else {
          res.isError = true;
          res.msg = "네트워크 에러";
        }
      })
      .catch((e) => {
        res.isError = true;
        res.msg = "네트워크 에러";
      });

    return res;
  },

  getAttendValid: function ({ attendPositionArray, limitPerson }) {
    const res = {
      fullPerson: false,
      oneReMain: false,
      msg: null,
    };

    if (attendPositionArray.length == limitPerson) {
      res.fullPerson = true;
      res.msg = "방이 꽉찼습니다. 죄송합니다.";
    }

    // if (attendPositionArray.length == limitPerson - 1) {
    //   res.oneReMain = true;
    //   res.msg = "라인 하나 남았으니 그거줄게요";
    // }

    return res;
  },

  updateAttendSumSeq: async function ({ roomSeq, attendSumSeq, loginUserSeq }) {
    if (attendSumSeq.includes(`${loginUserSeq}/`)) {
      return false;
    }

    let updateSeq = `${attendSumSeq}${loginUserSeq}/`;

    await axios({
      method: "POST",
      url: `${port}/updateAttendSumSeq`,
      params: { updateSeq, roomSeq },
    })
      .then(({ status, data }) => {})
      .catch((e) => {});
  },

  updateAttendPosition: async function ({
    attendPositionArray,
    wantedPosition,
    rankType,
    roomSeq,
  }) {
    switch (rankType) {
      default: {
        let updatePosition = "";
        attendPositionArray.forEach((position) => {
          updatePosition += `${position}/`;
        });
        updatePosition += wantedPosition;

        await axios({
          method: "POST",
          url: `${port}/updateAttendPosition`,
          params: { updatePosition, roomSeq },
        })
          .then(({ status, data }) => {})
          .catch((e) => {});

        return updatePosition;
      }

      case "team": {
        break;
      }
    }
  },

  getMyAttendRoom: async function (loginUserSeq) {
    const res = { isError: false, all: [], msg: "" };

    await axios({
      method: "GET",
      url: `${port}/getMyAttendRoom`,
      params: {
        loginUserSeq,
      },
    })
      .then(({ status, data }) => {
        res.all = data;
      })
      .catch((e) => {});

    return res;
  },

  getMsgRow: function getMsgRow(seq) {
    const res = { isError: false, msgRow: {}, msg: "" };
    axios({
      method: "GET",
      url: `${port}/getMsgRow`,
      params: {
        seq,
      },
    })
      .then(({ status, data }) => {
        res.msgRow = data;
      })
      .catch((e) => {});

    return res;
  },

  getAttendUser: async function (attendUserSeq) {
    const attendUser = [];

    const attendUserArray = attendUserSeq
      .split("/")
      .filter((item) => (!empty(item) ? true : false));

    for (let attendUserSeq of attendUserArray) {
      if (empty(attendUserSeq)) continue;

      await axios({
        method: "GET",
        url: `${port}/getAttendUser`,
        params: {
          attendUserSeq,
        },
      })
        .then(({ status, data }) => {
          attendUser.push(data);
        })
        .catch((e) => {
          alert(e);
        });
    }

    return attendUser;
  },

  PositionNameComponent: function ({ position }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri: `https://raw.githubusercontent.com/davidherasp/lol_images/master/role_lane_icons/${position}.png`,
          }}
        />
        <View style={{ marginLeft: 6 }}>
          <Text style={{ fontSize: 18, color: "#616161" }}>
            {LeagueOfLegends.getPositionName(position)}
          </Text>
        </View>
      </View>
    );
  },

  getAttendSumNumber: function (attendSumSeq) {
    const attendSum = attendSumSeq.split("/").filter((val, idx) => {
      return !empty(val) ? val : null;
    });

    return attendSum.length;
  },
};

export default LeagueOfLegends;
