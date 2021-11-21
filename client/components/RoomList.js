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

function AttendUserComponent({ item }) {
  return (
    <View
      style={{
        marginBottom: 6,
        flexDirection: "row",
      }}
    >
      {item.attendUser &&
        item.attendUser.map((val, idx) => (
          <View key={val.seq} style={{ marginRight: 12 }}>
            <SmSilverText>
              {val.name} (
              {LeagueOfLegends.getPositionName(item.attendPosition[idx])})
            </SmSilverText>
          </View>
        ))}
    </View>
  );
}

export default function renderItem({ item, layout, goDuoChat }) {
  return (
    <SafeAreaView style={{ padding: 12, marginLeft: 6 }}>
      <ScrollView>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => goDuoChat(item.seq)}
          style={{
            backgroundColor: "#212121",
            width: layout.width - 40,
            height: 120,
            borderRadius: 6,
            padding: 12,
          }}
        >
          <View style={{ marginBottom: 3 }}>
            <WhiteText style={{ fontSize: 12 }}>
              {LeagueOfLegends.getRankType(item.rankType)}
            </WhiteText>
          </View>
          <View style={{ marginBottom: 10 }}>
            <WhiteText style={{ fontSize: 18 }}>{item.title}</WhiteText>
          </View>
          <AttendUserComponent item={item} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="account"
              color="#888"
              size={12}
              style={{ marginRight: 3, marginTop: 1 }}
            />
            <SmSilverText>
              {LeagueOfLegends.getAttendSumNumber(item.attendSumSeq)}
            </SmSilverText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
