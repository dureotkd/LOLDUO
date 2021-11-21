import { NativeBaseProvider } from "native-base";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Container, WhiteText } from "../assets/css";
import { empty } from "../helper";
import { User, LeagueApi } from "../lib";
import {
  MaterialCommunityIcons,
  Ionicons,
  ActivityIndicator,
  useState,
  useRef,
  connect,
  useEffect,
  SafeAreaView,
  View,
  Text,
} from "../util";

function Login({ navigation, dispatch }) {
  const [start, setStart] = useState(false);
  const [loginId, setLoginId] = useState("hide on bush");
  const [summonerApi, setSummonerApi] = useState([]);

  useEffect(() => {}, []);

  const handleLogin = async () => {
    // 소환사명 검증
    const loginValid = LeagueApi.baseValid({ loginId });

    if (!loginValid.isRes) {
      alert(loginValid.msg);
      return;
    }

    const { summonerApi } = await LeagueApi.getSummonerApi({ loginId });

    if (empty(summonerApi)) {
      alert("존재하지 않는 소환사입니다");
      return;
    }

    const { isDup } = await LeagueApi.validSummoner(summonerApi);

    if (isDup) {
      alert("이미 서비스 중인 소환사명입니다");
      return;
    }

    const { teamLeague, privateLeague } = await LeagueApi.getLeagueApi(
      summonerApi.id
    );

    // 회원 5개의 숙련도 챔피언
    const { championMasteryApi } = await LeagueApi.getChampionMasteryApi(
      summonerApi.id
    );

    // 계정 생성
    await createSummonerAllData({
      teamLeague,
      privateLeague,
      summonerApi,
      championMasteryApi,
    });
  };

  const createSummonerAllData = async ({
    teamLeague,
    privateLeague,
    summonerApi,
    championMasteryApi,
  }) => {
    // 소환사 정보 저장
    const { insertId } = await LeagueApi.createSummoner(summonerApi);

    console.log(insertId);

    if (empty(insertId)) {
      alert("데이터 작업중 오류 \n개발자에게 문의해주세요");
      return;
    }

    // 개인솔랭 리그정보 저장
    await LeagueApi.createPrivateLeague(privateLeague, insertId);

    // 팀랭 리그정보 저장
    await LeagueApi.createTeamLeague(teamLeague, insertId);

    // 챔피언 숙련도 저장
    await LeagueApi.createChamiponMastery(championMasteryApi, insertId);

    // 소환사정보 (개인솔랭,팀랭,챔피언 숙련도 등) 호출
    const { summoner } = await LeagueApi.getSummonerAllData(insertId);

    await User.setStorageUser(summoner);

    setStart(true);
    alert("소환사 등록 성공");

    dispatch({
      type: "summonerFirstEnter",
      payload: { summoner },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c" }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View>
          <WhiteText style={{ fontSize: 26 }}>소환사명</WhiteText>
          <Text style={{ color: "#a0aec0" }}>
            실제 소유자가 아닐시 토큰을 통한 상품교환이 불가능합니다
          </Text>
          <View style={{ marginTop: 50 }}>
            <TextInput
              onChangeText={(text) => setLoginId(text)}
              style={{
                borderBottomColor: "#e8c488",
                fontSize: 14,
                color: "white",
                borderBottomWidth: 2,
                width: 330,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#718096",
              padding: 12,
              width: 330,
              marginTop: 35,
              borderRadius: 3,
            }}
          >
            <Text style={{ color: "#f7fafc", textAlign: "center" }}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ChanteState(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChanteState)(Login);
