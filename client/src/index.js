import * as React from "react";
import {
  Text,
  connect,
  Image,
  useWindowDimensions,
  Platform,
  useEffect,
  useState,
  View,
  TouchableOpacity,
} from "../util";
import { empty } from "../helper";
import {
  NavigationContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "../util/router";
import {
  SearchHome,
  DuoAboutRoom,
  DuoChat,
  UserInfo,
  Login,
  Join,
  Home,
  TokenStore,
} from "../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";

function Index({ summoner, loginUser }) {
  const [start, setStart] = useState(false);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const layout = useWindowDimensions();

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      {empty(loginUser) ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Join" component={Join}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="SearchHome"
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            animationEnabled: true,
            swipeEnabled: true,
            tabBarStyle: {
              borderTopWidth: 0,
              height: Platform.OS == "android" ? 60 : layout.height / 10,
              backgroundColor: "#000000",
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name == "SearchHome") {
                iconName = focused ? "compass" : "compass-outline";
                color = focused ? "#e8c488" : "#757575";
              } else if (route.name == "DuoAboutRoom") {
                iconName = focused ? "chat" : "chat-outline";
                color = focused ? "#e8c488" : "#757575";
              } else if (route.name == "TokenStore") {
                iconName = focused ? "star-circle" : "star-circle-outline";
                color = focused ? "#e8c488" : "#757575";
              } else {
                iconName = focused ? "account" : "account-outline";
                color = focused ? "#e8c488" : "#757575";
              }
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color={color}
                />
              );
            },
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: "#000000",
              height: 80,
            },
            headerTitle: "",
            headerLeft: () => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    source={{
                      uri: `https://opgg-static.akamaized.net/images/borders2/${loginUser.tier.toLowerCase()}.png`,
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      source={{
                        uri: `https://z.fow.kr/profile/${loginUser.profileIconId}.png`,
                      }}
                    />
                  </ImageBackground>

                  <View style={{ marginLeft: 6 }}>
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {loginUser.name}
                      </Text>
                    </View>
                    <View style={{ marginTop: 3 }}>
                      <Text style={{ color: "white", fontSize: 11 }}>
                        {loginUser.tier} {loginUser.rank}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="bell"
                    size={23}
                    style={{ color: "white", marginRight: 15 }}
                  />
                </TouchableOpacity>
              );
            },
          })}
        >
          <Tab.Screen name="SearchHome" component={SearchHome} />
          <Tab.Screen name="DuoAboutRoom" component={DuoAboutRoom} />
          <Tab.Screen name="TokenStore" component={TokenStore} />
          <Tab.Screen name="UserInfo" component={UserInfo} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

function StateChange(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(StateChange)(Index);
