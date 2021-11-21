import React, { useCallback } from "react";
import {
  Container,
  Card,
  WriteBtn,
  WhiteText,
  SilverText,
  SmSilverText,
} from "../assets/css";
import {
  useEffect,
  useState,
  View,
  ScrollView,
  connect,
  Text,
  useWindowDimensions,
  Image,
  SafeAreaView,
  MaterialCommunityIcons,
  FlatList,
} from "../util";
import { empty, getTimeKor } from "../helper";
import { LeagueOfLegends } from "../lib";
import { NavigationContainer, createStackNavigator } from "../util/router";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { Button, NativeBaseProvider, Row } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoomList from "../components/RoomList";

function MyAttendRoomStack({ loginUser, props }) {
  const [myAttendRoom, setMyAttendRoom] = useState(null);
  const [start, setStart] = useState(false);
  const layout = useWindowDimensions();
  const navigation = props.navigation;
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    return () => focusPage();
  });

  const focusPage = navigation.addListener("focus", () => {
    getAllData();
  });

  const getAllData = async () => {
    const { isError, all, msg } = await LeagueOfLegends.getMyAttendRoom(
      loginUser.seq
    );

    const allData = [];

    for (let row of all) {
      const title = row.title;
      const gameStyle = row.gameStyle;
      const rankType = row.rankType;
      const seq = row.seq;
      const attendSumSeq = row.attendSumSeq;
      const regDateKor = getTimeKor(row.regData);
      const attendUser = await LeagueOfLegends.getAttendUser(attendSumSeq);
      const attendPosition = row.attendPosition
        .split("/")
        .filter((item) => (!empty(item) ? true : false));

      allData.push({
        seq,
        title,
        gameStyle,
        rankType,
        attendSumSeq,
        attendPosition,
        regDateKor,
        attendUser,
      });
    }

    setMyAttendRoom(allData);
  };

  const goDuoChat = async (roomSeq) => {
    const { row } = await LeagueOfLegends.getRoomDetail(roomSeq);

    if (empty(row)) {
      alert("방이 존재하지 않습니다.");
      return;
    }

    navigation.navigate("DuoChat", { roomSeq });
  };

  if (empty(myAttendRoom)) {
    return (
      <NativeBaseProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: layout.height - 260,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/myAttendRoom/noun_messages_yellow.png")}
            />
            <View>
              <WhiteText style={{ fontSize: 15 }}>
                메시지 목록이 비어있습니다
              </WhiteText>
            </View>
            <View style={{ marginTop: 3 }}>
              <WhiteText style={{ fontSize: 11 }}>
                자동매칭으로 팀원을 만들어 보세요
              </WhiteText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchHome")}
              style={{
                backgroundColor: "#303f9f",
                width: 200,
                height: 40,
                borderRadius: 6,
                marginTop: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                자동 매칭으로 가기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <FlatList
        data={myAttendRoom}
        renderItem={({ item }) => (
          <RoomList item={item} layout={layout} goDuoChat={goDuoChat} />
        )}
        keyExtractor={(item) => item.seq.toString()}
      />
    </NativeBaseProvider>
  );
}

function StateChange(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(StateChange)(MyAttendRoomStack);
