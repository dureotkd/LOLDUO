import React from "react";
import { Container } from "../assets/css";
import { User } from "../lib";
import { empty } from "../helper";
import {
  ActivityIndicator,
  useState,
  useRef,
  connect,
  MaterialCommunityIcons,
} from "../util";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Center,
} from "native-base";

function Join({ navigation, dispatch }) {
  const [loginId, setLoginId] = useState();
  const [loginPw, setLoginPw] = useState();

  const handleJoin = async () => {
    const baseVliad = User.baseValid({ loginId, loginPw });

    if (!baseVliad.isRes) {
      alert(baseVliad.msg);
      return;
    }

    const joinValid = User.joinValid({ loginId, loginPw });

    if (!joinValid.isRes) {
      alert(joinValid.msg);
      return;
    }

    const dupId = await User.getDupId(loginId);

    if (dupId.isRes) {
      alert(dupId.msg);
      return;
    }

    const doJoin = await User.getDoJoin({ loginId, loginPw });

    if (!doJoin.isRes) {
      alert(doJoin.msg);
      return;
    }

    const { data } = await User.getData({ loginId, loginPw });

    await UserToken.createUserToken(data.seq);

    await User.setStorageUser(data);

    dispatch({
      type: "doLogin",
      payload: { loginUser: data },
    });
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "muted.700",
                fontSize: "sm",
                fontWeight: 600,
              }}
            >
              아이디
            </FormControl.Label>
            <Input onChangeText={(text) => setLoginId(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "muted.700",
                fontSize: "sm",
                fontWeight: 600,
              }}
            >
              비밀번호
            </FormControl.Label>
            <Input type="password" onChangeText={(text) => setLoginPw(text)} />
          </FormControl>
          <VStack space={2} mt={5}>
            <Button
              onPress={handleJoin}
              colorScheme="cyan"
              _text={{ color: "white" }}
            >
              회원가입
            </Button>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

function ChangeState(state) {
  return {
    state: state.loginUser,
  };
}

export default connect(ChangeState)(Join);
