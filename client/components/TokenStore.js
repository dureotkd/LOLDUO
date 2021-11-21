import React, { useEffect, useState } from "react";
import { Container } from "../assets/css";
import { Text, connect } from "../util";
import { User, LeagueOfLegends } from "../lib";
import { empty, getTimeKor } from "../helper";

function TokenStore({ navigation, route }) {
  const [duoChat, setDuoChat] = useState([]);

  useEffect(() => {}, []);

  return (
    <Container>
      <Text>토큰 스zz토어</Text>
    </Container>
  );
}

function StateChange(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(StateChange)(TokenStore);
