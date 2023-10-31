import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Button, Input } from "../components";
import { globals, loginStyle } from "../styles";
import { useNavigation } from "@react-navigation/native";

import { login } from "../api/auth/auth";
import { socket } from "../services/socketInstance";
import { useUserContext } from "../hooks/useUserContext";
import { storeObject } from "../helpers/asyncStorage";

const Login = () => {
  const navigation = useNavigation();
  const [isCafeOwner, setIsCafeOwner] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const handleLogin = async () => {
    // API call
    try {
      const user = await login(id, password);
      socket.emit("user:connect", { id });

      // Update context
      const details = {
        id: id,
        isSignedIn: true,
        role: user,
      };
      setUser(details);
      storeObject("userDetails", details);

      if (user === "B40") {
        navigation.navigate("B40Dashboard");
      }
      if (user === "NON-B40") {
        navigation.navigate("Dashboard");
      }
      if (user === "CAFE") {
        navigation.navigate("CODashboard");
      }

      // Error for no role specified here
      // Error message suggestion: Pop-up error
    } catch (error) {
      // Look for status code & message
      console.log(error);
    }
  };

  return (
    <View
      style={[
        globals.container,
        { justifyContent: "center", paddingHorizontal: 16 },
      ]}>
      <View>
        <Image
          style={{
            width: 115,
            height: 78,
            alignSelf: "center",
            marginBottom: 8,
          }}
          source={require("../assets/eKupon/logo.png")}
        />
        <Text style={loginStyle.loginHeader}>eKuponXLoyalty@UniSZA</Text>
        <Input
          label={isCafeOwner ? "Username |" : "Matric No. |"}
          value={id}
          onChange={setId}
        />
        <Input
          label={"Password |"}
          secureTextEntry={true}
          value={password}
          onChange={setPassword}
        />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} onPress={handleLogin} />
        </View>
        <TouchableOpacity onPress={() => setIsCafeOwner(!isCafeOwner)}>
          <Text style={loginStyle.smallText}>
            {isCafeOwner ? "Are you a student?" : "Are you a cafe owner?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
