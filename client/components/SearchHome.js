import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  connect,
  SafeAreaView,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "../util";
import {
  Container,
  UserPrivateCard,
  UserTeamCard,
  WhiteText,
} from "../assets/css";
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  NativeBaseProvider,
  Progress,
  Slider,
  extendTheme,
} from "native-base";
import { Api } from "../api";
import { Linking } from "react-native";

import { User, LeagueOfLegends } from "../lib";
import { empty } from "../helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import SelectDropdown from "react-native-select-dropdown";

function SearchHome({ navigation, loginUser }) {
  const { width } = useWindowDimensions("width");
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [gameStyle, setGameStyle] = useState(null);
  const [rankType, setRankType] = useState(null);
  const [searchPosition, setSearchPosition] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [searchSetting, setSearchSetting] = useState({});
  const searchPositionDefault = ["TOP", "JUNGLE", "MIDDLE", "ADC", "SUPPORT"];
  const loginUserSeq = loginUser.seq;

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const { isError, searchSettingDB } = await User.getSearchSetting(
      loginUserSeq
    );

    setSearchSetting(searchSettingDB);
    setMyPosition(searchSettingDB?.position);
    setSearchPosition(searchSettingDB?.searchPosition);
  };

  const handleSearchSetting = async () => {
    const loginUserSeq = loginUser.seq;

    if (myPosition == searchPosition) {
      alert("나의 포지션 과 찾는 포지션은 달라야지 임마");
      return;
    }

    const { insertId, isError } = await LeagueOfLegends.saveSearchSetting({
      gameStyle,
      searchPosition,
      myPosition,
      loginUserSeq,
    });

    if (isError) alert("에러남");
    else alert(insertId);

    /*
    expDate 만들어서 넣어줘야함 (예상시간)
    */
    // const test = await LeagueOfLegends.saveSearchList({});
  };

  return (
    <NativeBaseProvider>
      <Container>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://zigzag-rosemary-d54.notion.site/45fbb8d20f3c429781f0710243628dc2"
            )
          }
          style={{
            justifyContent: "center",
            width: width - 30,
            backgroundColor: "#212121",
            height: 70,
            padding: 12,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <View>
                <WhiteText style={{ fontSize: 15, fontWeight: "bold" }}>
                  슬기로운 어플이용안내
                </WhiteText>
              </View>
              <View style={{ marginTop: 3 }}>
                <WhiteText style={{ fontSize: 11, color: "#e0e0e0" }}>
                  빠르고 완벽한 자동매칭으로 티어를 올리다
                </WhiteText>
              </View>
            </View>
            {/*  <MaterialCommunityIcons
              name="arrow-right-thick"
              color={"#e8c488"}
              size={25}
            /> */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: width - 30,
            height: "60%",
            backgroundColor: "#212121",
            padding: 12,
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <WhiteText
            style={{
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            자동매칭 설정
          </WhiteText>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "flex-start",
            }}
          >
            <View style={{ marginRight: 20 }}>
              <WhiteText style={{ color: "#e0e0e0" }}>나의 포지션</WhiteText>
              <SelectDropdown
                data={searchPositionDefault}
                defaultValue={`${searchSetting?.position}`}
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
                  backgroundColor: "white",
                  borderRadius: 6,
                  height: 40,
                  marginTop: 10,
                  marginBottom: 20,
                  width: 120,
                }}
                onSelect={(selectedItem, index) => {
                  setMyPosition(selectedItem);
                }}
              />
            </View>
            <View>
              <Text style={{ color: "#e0e0e0" }}>찾는 포지션</Text>
              <SelectDropdown
                data={["TOP", "JUNGLE", "MIDDLE", "ADC", "SUPPORT"]}
                defaultValue={`${searchSetting?.searchPosition}`}
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
                  backgroundColor: "white",
                  borderRadius: 6,
                  height: 40,
                  marginTop: 10,
                  marginBottom: 20,
                  width: 120,
                }}
                onSelect={(selectedItem, index) => {
                  setSearchPosition(selectedItem);
                }}
              />
            </View>
          </View>
          <Text style={{ color: "#e0e0e0" }}>게임 스타일</Text>
          <View style={{ marginTop: 10 }}>
            <VStack width="80%">
              <Slider
                defaultValue={40}
                colorScheme="blue"
                onChange={(value) => setGameStyle(value)}
                step={1}
                size="sm"
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </VStack>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => alert("준비중입니다.")}
          style={{
            backgroundColor: "#283593",
            width: width - 30,
            height: 50,
            marginTop: 12,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WhiteText>자동매칭</WhiteText>
        </TouchableOpacity>
      </Container>
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

function PrivateTierImg({ tier }) {
  var tier = tier?.toLowerCase();
  let imgComponent = "";

  switch (tier) {
    case "challenger":
      imgComponent = (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/tier/challenger.png")}
        />
      );
      break;
    case "diamond":
      imgComponent = (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/tier/diamond.png")}
        />
      );
      break;
    case "gold":
      imgComponent = (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/tier/gold.png")}
        />
      );
      break;
    case "silver":
      imgComponent = (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/tier/silver.png")}
        />
      );
      break;
    default:
      imgComponent = (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/tier/silver.png")}
        />
      );
      break;
  }

  return imgComponent;
}

function ChangeState(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChangeState)(SearchHome);
