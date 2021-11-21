import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container } from "../assets/css";
import { User } from "../lib";
import { ActivityIndicator, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const [start, setStart] = useState(false);

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    setStart(true);
  }, []);

  if (!start) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a202c" }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 1000,
            borderColor: "#d69e2e",
            borderWidth: 1,
          }}
          source={{
            uri: "https://www.pcgamesn.com/wp-content/uploads/2021/03/league-of-legends-group.jpg",
          }}
        />
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              color: "#cbd5e0",
              fontSize: 23,
            }}
          >
            League Of Legends
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            backgroundColor: "#718096",
            padding: 12,
            width: 200,
            marginTop: 15,
            borderRadius: 3,
          }}
        >
          <Text style={{ color: "#f7fafc", textAlign: "center" }}>
            소환사명 간단 시작
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// export default (props) => {
//   return (
//     <NativeBaseProvider>
//       <Container>
//         <Home props={props} />
//       </Container>
//     </NativeBaseProvider>
//   );
// };
