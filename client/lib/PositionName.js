import React from "react";
import { LeagueOfLegends } from ".";
import { View, Image, Text } from "react-native";
import { empty } from "../helper";
export default function PositionName({ position }) {
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
