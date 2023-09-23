import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components";

import { globals, CPStyle } from "../styles";

const COShowPIN = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState({
    btn1: true,
    btn2: false,
  });

  const onActive = (value) => {
    if ("btn1" === value) {
      setActive({ btn1: true, btn2: false });
    }
    if ("btn2" === value) {
      setActive({ btn1: false, btn2: true });
    }
  };

  const onNextButtonPress = () => {
    if (active.btn1) {
      navigation.navigate("MyPINGeneratorCashless"); // Navigate to the "CashlessScreen" when btn1 is active
    } else if (active.btn2) {
      navigation.navigate("MyPINGeneratorGreenCampus"); // Navigate to the "GreenCampusScreen" when btn2 is active
    }
  };
  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[CPStyle.textCenter, CPStyle.payHeader]}>
          Choose campaign to generate PIN
        </Text>
        <TouchableOpacity onPress={() => onActive("btn1")}>
          <Text
            style={[
              CPStyle.textCenter,
              CPStyle.payAmount,
              active.btn1 && CPStyle.active,
            ]}
          >
            Cashless
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onActive("btn2")}>
          <Text
            style={[
              CPStyle.textCenter,
              CPStyle.payAmount,
              active.btn2 && CPStyle.active,
            ]}
          >
            Green Campus
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label={"Generate PIN"} onPress={onNextButtonPress} />
      </View>
    </View>
  );
};

export default COShowPIN;
