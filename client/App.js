import {
  combineReducers,
  connect,
  SafeAreaView,
  Text,
  Provider,
  createStore,
  useEffect,
  useState,
  StatusBar,
  View,
} from "./util";
import React from "react";
import AppIndex from "./src";
import { LeagueOfLegends, User } from "./lib";
import { empty } from "./helper";
import port from "./port";

function TEST() {
  return (
    <View>
      <Text>zz</Text>
    </View>
  );
}

export default function App() {
  const [duoRoom, setDuoRoom] = useState([]);
  const [loginUser, setLoginUser] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const storageLoginUser = await User.getStorageUser();
    if (!empty(storageLoginUser)) setLoginUser(storageLoginUser);
    const { list } = await LeagueOfLegends.getDuoRoom();
    setDuoRoom(list);
  };

  const loginUserRedux = (state = loginUser, action) => {
    switch (action.type) {
      case "doLogin": {
        const loginUser = action.payload.loginUser;

        return loginUser;
      }

      default: {
        return state;
      }
    }
  };

  const store = createStore(combineReducers({ loginUser: loginUserRedux }));

  return (
    <Provider store={store}>
      <StatusBar animated={true} />
      <AppIndex />
    </Provider>
  );
}
