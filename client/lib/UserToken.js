import { empty } from "../helper";
import port from "../port";
import axios from "axios";

const UserToken = {
  createUserToken: async function (userSeq) {
    const res = {
      isRes: true,
      msg: null,
    };

    axios({
      method: "POST",
      url: `${port}/createUserToken`,
      params: {
        userSeq,
      },
    })
      .then(({ status, data }) => {
        if (status !== 200) {
          res.isRes = false;
          res.msg = "토큰 생성오류";
        }
      })
      .catch((e) => {
        res.isRes = false;
        res.msg = "토큰 생성오류";
      });

    return res;
  },
};
