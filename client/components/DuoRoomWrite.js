import React, { useLayoutEffect } from "react";
import axios from "axios";
import { empty } from "../helper";
import {
  useEffect,
  useState,
  useRef,
  connect,
  View,
  TextInput,
  useWindowDimensions,
  MaterialCommunityIcons,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  ToastAndroid,
} from "../util";
import {
  Stack,
  Center,
  Input,
  Heading,
  NativeBaseProvider,
  extendTheme,
  Text,
  Row,
  FormControl,
  Select,
  CheckIcon,
  Button,
  Label,
  Slider,
  Image,
  Radio,
} from "native-base";
import { LeagueOfLegends } from "../lib";
import SelectDropdown from "react-native-select-dropdown";
import port from "../port";
import io from "socket.io-client";
import { WhiteText } from "../assets/css";

// import { Div, ThemeProvider } from "react-native-magnus";

function DuoRoomWrite({ navigation, loginUser, dispatch, route }) {
  let opacity = new Animated.Value(0);

  const [title, setTitle] = useState();
  const [rankType, setRankType] = useState("private");
  const [roomPerson, setRoomPerson] = useState(2);
  const [myPosition, setMyPosition] = useState();
  const [gameStyle, setGameStyle] = useState();
  const [wantedPosition, setWantedPosition] = useState();
  const layout = useWindowDimensions();

  useEffect(() => {}, []);

  const handleCreateDuoRoom = async () => {
    const insertData = {
      title,
      rankType,
      roomPerson,
      myPosition,
      gameStyle,
      wantedPosition,
      sumSeq: loginUser.seq,
    };

    const valid = LeagueOfLegends.validDuoRoom(insertData);
    if (valid.isError) {
      alert(valid.msg);
      return;
    }

    const { insertSeq, isError, msg } = await LeagueOfLegends.createDuoRoom(
      insertData
    );

    if (isError) {
      alert(msg);
      return;
    }

    const { row } = await LeagueOfLegends.getInsertRoom(insertSeq);

    dispatch({
      type: "createRoom",
      payload: {
        insertRoomRow: row,
      },
    });
    // navigation.navigate()
  };

  return (
    <NativeBaseProvider>
      <View style={{ padding: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={23}
              color={"white"}
              style={{ marginRight: 6 }}
            />
            <WhiteText style={{ fontWeight: "bold", fontSize: 18 }}>
              듀오 구해요
            </WhiteText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCreateDuoRoom}
            style={{
              marginRight: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#e8c488",
              paddingBottom: 3,
            }}
          >
            <WhiteText style={{ fontWeight: "bold", fontSize: 18 }}>
              완료
            </WhiteText>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="제목"
            placeholderTextColor="#e0e0e0"
            onChangeText={(text) => setTitle(text)}
            style={{
              marginTop: 12,
              borderBottomWidth: 1,
              color: "white",
              borderBottomColor: "#e0e0e0",
              paddingBottom: 12,
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 14, color: "#9e9e9e", fontWeight: "bold" }}>
            게임 유형
          </Text>
          <Radio.Group
            defaultValue="1"
            name="myRadioGroup"
            justifyContent="space-between"
            colorScheme="red"
            mt={3}
            defaultValue="private"
            onChange={(val) => {
              setRankType(val);

              let limitPerson;

              switch (val) {
                default:
                  setWantedPosition(null);
                  setMyPosition(null);
                  limitPerson = 5;
                  break;

                case "private":
                  limitPerson = 2;
                  break;
              }

              setRoomPerson(limitPerson);
            }}
          >
            <Radio value="private" my={1}>
              <View style={{ marginLeft: 6 }}>
                <WhiteText>개인/2인랭</WhiteText>
              </View>
            </Radio>
            <Radio value="team" my={1} mt={2}>
              <View style={{ marginLeft: 6 }}>
                <WhiteText>팀랭</WhiteText>
              </View>
            </Radio>
            <Radio value="normal" my={1} mt={2}>
              <View style={{ marginLeft: 6 }}>
                <WhiteText>노말</WhiteText>
              </View>
            </Radio>
          </Radio.Group>
        </View>

        {rankType == "private" ? (
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 14, color: "#9e9e9e", fontWeight: "bold" }}
              >
                나의 포지션
              </Text>
              {/*나의 포지션 셀렉트박스*/}
              <PositionSelect
                position={myPosition}
                setMyPosition={setMyPosition}
              />
            </View>

            <View>
              <Text
                style={{ fontSize: 14, color: "#9e9e9e", fontWeight: "bold" }}
              >
                찾는 포지션
              </Text>
              {/*상대방 포지션 셀렉트박스*/}
              <PositionSelect
                position={myPosition}
                setWantedPosition={setWantedPosition}
              />
            </View>
          </View>
        ) : null}

        <View style={{ marginTop: 14 }}>
          <Text style={{ fontSize: 14, color: "#9e9e9e", fontWeight: "bold" }}>
            방 최대인원
          </Text>
          <View
            style={{
              marginTop: 8,
              backgroundColor: "#212121",
              width: 40,
              height: 40,
              padding: 6,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <WhiteText>{roomPerson}명</WhiteText>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 14, color: "#9e9e9e", fontWeight: "bold" }}>
            게임 스타일
          </Text>
          <View style={{ width: "70%", marginTop: 10 }}>
            <Slider
              defaultValue={50}
              colorScheme="orange"
              onChangeEnd={(value) => {
                let toastMsg;
                if (value > 50) {
                  toastMsg = "빡겜이시군요 😎";
                } else if (value == 50) {
                  toastMsg = "보통이시군요 😊";
                } else {
                  toastMsg = "즐겜이시군요 😆";
                }
                ToastAndroid.show(
                  `${toastMsg} 수치:${value} `,
                  ToastAndroid.SHORT
                );
                setGameStyle(value);
              }}
              step={1}
              size="sm"
            >
              <Slider.Track bg="gray.400">
                <Slider.FilledTrack bg="orange.300" />
              </Slider.Track>
              <Slider.Thumb bg="orange.300" />
            </Slider>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

function PositionName({ position }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        alt="라인 선택 이미지"
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
}

function PositionSelect({ position, setMyPosition, setWantedPosition }) {
  const positionDefault = ["TOP", "JUNGLE", "MIDDLE", "ADC", "SUPPORT"];
  return (
    <SelectDropdown
      data={positionDefault}
      onSelect={(selectedItem, index) => {
        if (!empty(setMyPosition)) setMyPosition(selectedItem);
        else if (!empty(setWantedPosition)) setWantedPosition(selectedItem);
      }}
      renderCustomizedRowChild={(item, index) => (
        <View>
          {
            {
              TOP: <PositionName position={item} />,
              JUNGLE: <PositionName position={item} />,
              MIDDLE: <PositionName position={item} />,
              ADC: <PositionName position={item} />,
              SUPPORT: <PositionName position={item} />,
            }[item]
          }
        </View>
      )}
      renderCustomizedButtonChild={(item, index) => (
        <View>
          {
            {
              TOP: <PositionName position={item} />,
              JUNGLE: <PositionName position={item} />,
              MIDDLE: <PositionName position={item} />,
              ADC: <PositionName position={item} />,
              SUPPORT: <PositionName position={item} />,
            }[item]
          }
        </View>
      )}
      buttonStyle={{
        height: 40,
        marginTop: 10,
        marginBottom: 20,
        width: 120,
        borderRadius: 3,
      }}
    />
  );
}

function ChangeState(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChangeState)(DuoRoomWrite);
