import React, { useEffect } from "react";
import {
  NavigationContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "../util/router";
import { useLayoutEffect, useState, Text, TouchableOpacity } from "../util";
import DuoRoom from "./DuoRoom";
import DuoRoomWrite from "./DuoRoomWrite";
import DuoChat from "./DuoChat";
import { background, style } from "styled-system";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { connect } from "react-redux";

function DuoAboutRoom({ navigation, loginUser, dispatch }) {
  const Stack = createStackNavigator();
  const naviState = navigation.getState();
  const [isStart, setIsStart] = useState(false);

  const handleCreateDuoRoom = () => {};

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "transparentModal",
        animationEnabled: true,
        cardStyle: { backgroundColor: "#000000" },
      }}
    >
      <Stack.Screen
        name="DuoRoom"
        options={{ headerShown: false }}
        component={DuoRoom}
      ></Stack.Screen>
      <Stack.Screen
        name="DuoChat"
        options={{
          // headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#000000",
            elevation: 0,
          },
        }}
        component={DuoChat}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DuoRoomWrite"
        component={DuoRoomWrite}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function StateChange(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(StateChange)(DuoAboutRoom);
