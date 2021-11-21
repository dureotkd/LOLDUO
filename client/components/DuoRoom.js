import React from "react";
import {
  useEffect,
  useState,
  View,
  ScrollView,
  connect,
  useWindowDimensions,
  TabView,
  SceneMap,
  Text,
} from "../util";

import JustRoom from "../components/JustRoom";
import MyAttendRoomStack from "./MyAttendRoomStack";
import { background, color } from "styled-system";
import { TabBar } from "react-native-tab-view";

function DuoRoom(props) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(3);
  const [isChange, setIsChange] = useState(false);
  const [routes] = useState([
    { key: "JustRoom", title: "듀오 구해요" },
    { key: "MyAttendRoomStack", title: "참여 했어요" },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "MyAttendRoomStack": {
        return <MyAttendRoomStack props={props} jumpTo={jumpTo} />;
      }
      default: {
        return <JustRoom props={props} jumpTo={jumpTo} />;
      }
    }
  };

  const handleIndexChange = () => {
    setIsChange(!isChange);
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(props) => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: "#000000",
              alignItems: "center",
            }}
            activeColor={"#e8c488"}
            inactiveColor={"silver"}
            style={{
              backgroundColor: "#000000",
              shadowColor: "white",
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            }}
          />
        );
      }}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
    />
  );
}

function ChangeState(state) {
  return {
    duoRoom: state.duoRoom,
  };
}
export default connect(ChangeState)(DuoRoom);
