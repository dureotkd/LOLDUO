import React from "react";
import { LeagueOfLegends } from ".";
import { View, Image, Text } from "react-native";
import { empty } from "../helper";
import SelectDropdown from "react-native-select-dropdown";
import { PositionName } from "../lib/PositionName";

export default function PositionSelect({
  position,
  setMyPosition,
  setWantedPosition,
}) {
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
        borderBottomWidth: 2,
        borderColor: "#e8c488",
        height: 40,
        marginTop: 10,
        marginBottom: 20,
        width: 120,
      }}
    />
  );
}
