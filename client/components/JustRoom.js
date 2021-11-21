import React from "react";
import {
  useEffect,
  useState,
  View,
  ScrollView,
  connect,
  Text,
  useWindowDimensions,
  Image,
  MaterialCommunityIcons,
  useRef,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
} from "../util";
import {
  Modal,
  Button,
  Stack,
  Center,
  NativeBaseProvider,
  Radio,
} from "native-base";
import { empty, getTimeKor } from "../helper";
import { LeagueOfLegends } from "../lib";
import RoomList from "../components/RoomList";

function JustRoom({ props, jumpTo, loginUser }) {
  const dispatch = props.dispatch;
  const navigation = props.navigation;
  const layout = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [duoRoom, setDuoRoom] = useState();

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
    const { list } = await LeagueOfLegends.getDuoRoomAll({
      loginUserSeq: loginUser.seq,
    });

    const allData = [];

    for (let row of list) {
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
    setDuoRoom(allData);
  };

  const handleWrite = async () => {
    navigation.navigate("DuoRoomWrite");
  };

  const goDuoChat = async (roomSeq) => {
    const { row } = await LeagueOfLegends.getRoomDetail(roomSeq);

    if (empty(row)) {
      alert("방이 존재하지 않습니다.");
      return;
    }

    const limitPerson = row.roomPerson;
    const attendPosition = row.attendPosition;
    const attendSumSeq = row.attendSumSeq;
    const loginUserSeq = loginUser.seq;

    const attendPositionArray = attendPosition.split("/").filter((val) => {
      return !empty(val) ? true : false;
    });

    const { fullPerson, oneReMain, msg } = LeagueOfLegends.getAttendValid({
      attendPositionArray,
      limitPerson,
    });

    if (fullPerson) {
      alert(msg);
      return;
    }

    navigation.navigate("DuoChat", { roomSeq });

    /*     
    const attendPosition = row.attendPosition;
    const limitPerson = row.roomPerson;
    const rankType = row.rankType;
    const wantedPosition = row.wantedPosition;

    const attendPositionArray = attendPosition.split("/").filter((val) => {
      return !empty(val) ? true : false;
    });

    */
  };

  return (
    <NativeBaseProvider>
      <FlatList
        data={duoRoom}
        renderItem={({ item }) => (
          <RoomList item={item} layout={layout} goDuoChat={goDuoChat} />
        )}
        keyExtractor={(item) => item.seq.toString()}
      />
      <WriteBtn handleWrite={handleWrite} />
    </NativeBaseProvider>
  );
}

function WriteBtn({ handleWrite }) {
  return (
    <View
      style={{
        right: 20,
        bottom: 30,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 50,
      }}
    >
      {/* 듀오구해요 등록 팝업 */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleWrite}
        style={{
          backgroundColor: "#424242",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          width: 40,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function ChageState(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChageState)(JustRoom);
