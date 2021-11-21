import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import * as Font from "expo-font";
import { style } from "styled-system";

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding: 12px;
  background-color: #000000;
  align-items: center;
  /* background-color: black; */
`;

const UserPrivateCard = styled.View`
  display: flex;
  width: 100%;
  border-radius: 15px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  height: 130px;
`;

const UserTeamCard = styled.View`
  display: flex;
  width: 48%;
  border-radius: 10px;
  padding: 6px;
  background-color: #303030;
  flex-direction: column;
  align-items: center;
`;

const WhiteText = styled.Text`
  font-size: 14px;
  color: white;
`;

const SmSilverText = styled.Text`
  font-size: 12px;
  color: #888;
`;

const SilverText = styled.Text`
  font-size: 15px;
  color: #888;
`;

const Card = styled.TouchableOpacity`
  flex-direction: column;
  padding: 12px;
  background-color: #353535;
  width: 100%;
  margin: 13px auto;
  align-items: flex-start;
  justify-content: center;
  border-radius: 12px;
`;

const WriteBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 25px;
  width: 50px;
  height: 50px;
  background-color: pink;
  align-items: center;
  border-radius: 50px;
  justify-content: space-evenly;
  flex-direction: row;
`;

const NotoRegular = styled.Text`
  color: black;
`;

const RobotoRegular = styled.Text`
  color: black;
`;

export {
  Container,
  Card,
  WriteBtn,
  NotoRegular,
  RobotoRegular,
  UserTeamCard,
  UserPrivateCard,
  WhiteText,
  SilverText,
  SmSilverText,
};
