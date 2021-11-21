import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container } from "../assets/css";
import { SafeAreaView, Text, connect, BackHandler } from "../util";
import { User, LeagueOfLegends } from "../lib";
import port from "../port";
import { empty, getTimeKor } from "../helper";
import {
  NativeBaseProvider,
  Center,
  Box,
  Input,
  Button,
  View,
  ScrollView,
} from "native-base";
import { textStyle } from "styled-system";
import io from "socket.io-client";
import { Console } from "jest-util";
const socket = io(port);

function DuoChat({ navigation, route, loginUser }) {
  const [loading, setLoading] = useState(true);
  const [roomDetail, setRoomDetail] = useState({});
  const [msg, setMsg] = useState(null);
  const [msgAll, setMsgAll] = useState([]);

  // useEffect(() => {
  //   alert("z");
  //   /* 상대방이 듀오룸 접속시 socket을 통해 빌드업해야함*/
  //   /* 방관련된 데이터 받아오기 */
  //   roomSetting();
  // }, []);

  // // useEffect(() => {
  // //   if (!loading) {
  // //     navigation.setOptions({
  // //       title: `${roomDetail.title} (${roomDetail.attendSumSeq})`,
  // //     });
  // //   }
  // // }, [loading]);

  // const roomSetting = async () => {
  //   const { row, isError, msg } = await LeagueOfLegends.getRoomDetail(
  //     route.params.roomSeq
  //   );

  //   // console.log(route.params.roomSeq);

  //   if (isError) {
  //     alert(msg);
  //     return;
  //   }

  //   //  =================== 참가자 업데이트  ==================

  //   const loginUserSeq = loginUser.seq;
  //   const attendSumSeq = row.attendSumSeq;
  //   const roomSeq = row.seq;

  //   await LeagueOfLegends.updateAttendSumSeq({
  //     roomSeq,
  //     attendSumSeq,
  //     loginUserSeq,
  //   });

  //   //  =================== loading 끝  ==================
  //   setLoading(false);
  // };

  // const handleRemoveSocket = () => {
  //   let currentRoom = roomDetail.seq;

  //   socket.emit("leaveRoom", { currentRoom, loginUser });
  //   console.log(`이방 ${currentRoom} 퇴장합니다`);

  //   socket.off();
  // };

  // useEffect(() => {
  //   console.log(loading);
  //   if (!loading) {
  //     navigation.setOptions({ title: `${roomDetail.title}/${roomDetail.seq}` });

  //     socketSetting();

  //     return () => handleRemoveSocket();
  //   }
  // }, [loading]);

  // const socketSetting = () => {
  //   let currentRoom = roomDetail.seq;

  //   socket.emit("joinRoom", { currentRoom, loginUser });

  //   socket.on("joinRoom", ({ currentRoom, loginUser }) => {
  //     console.log(`${loginUser.nickname}님 ${currentRoom}방 입장하셨습니다.`);
  //   });

  //   socket.on("leaveRoom", ({ currentRoom, loginUser }) => {
  //     console.log(`${loginUser.nickname} ${currentRoom}방 떠났습니다..`);
  //   });

  //   socket.on("chatMsg", ({ msgAllDB, newMsg }) => {
  //     setMsgAll([...msgAllDB, newMsg]);
  //   });
  // };

  //   const { row } = await LeagueOfLegends.getRoomDetail(roomSeq);
  //   const { msgAllDB } = await LeagueOfLegends.getChatMsgAll(roomSeq);
  //   setRoomDetail(row);
  //   setMsgAll(msgAllDB);
  //   setLoading(false);
  // };

  // const handleMsgSubmit = async () => {
  //   const loginUserSeq = loginUser.seq;
  //   const roomSeq = roomDetail.seq;

  //   const { msgAllDB } = await LeagueOfLegends.getChatMsgAll(roomSeq);

  //   const insertId = await LeagueOfLegends.sendChatMsg({
  //     loginUserSeq,
  //     roomSeq,
  //     msg,
  //   });

  //   const newMsg = await LeagueOfLegends.getNewMsg(insertId);

  //   // chat message server에게 전달
  //   socket.emit("chatMsg", {
  //     newMsg,
  //     roomSeq,
  //     msgAllDB,
  //   });
  // };

  return (
    <NativeBaseProvider>
      <View>
        <Text>?</Text>
      </View>
    </NativeBaseProvider>
  );
}

function ChangeState(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChangeState)(DuoChat);
