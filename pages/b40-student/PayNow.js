import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components";

import { globals, CPStyle } from "../../styles";

const PayNow = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState({
    btn1: true,
    btn2: false,
  });
  const [isWeb, setIsWeb] = useState(false); // Add state for checking if the app is running on the web

  useEffect(() => {
    setIsWeb(Platform.OS === "web"); // Set the isWeb state based on the platform
  }, []);

  const onActive = (value) => {
    if ("btn1" === value) {
      setActive({ btn1: true, btn2: false });
    }
    if ("btn2" === value) {
      setActive({ btn1: false, btn2: true });
    }
  };

  const SelectCafe = () => {
    if (active.btn1) {
      navigation.navigate("PayCafeWeb", { amount: 1 }); // Navigate to the "CashlessScreen" when btn1 is active
    } else if (active.btn2) {
      navigation.navigate("PayCafeWeb", { amount: 2 }); // Navigate to the "GreenCampusScreen" when btn2 is active
    }
  };

  const onNextButtonPress = () => {
    if (active.btn1) {
      navigation.navigate("QRScan"); // Navigate to the "CashlessScreen" when btn1 is active
    } else if (active.btn2) {
      navigation.navigate("QRScan"); // Navigate to the "GreenCampusScreen" when btn2 is active
    }
  };
  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[CPStyle.textCenter, CPStyle.payHeader]}>
          Choose your amount
        </Text>
        <TouchableOpacity onPress={() => onActive("btn1")}>
          <Text
            style={[
              CPStyle.textCenter,
              CPStyle.payAmount,
              active.btn1 && CPStyle.active,
            ]}
          >
            RM 1
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
            RM 2
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 24 }}>
        {isWeb ? (
          <Button label={"Select Cafe"} onPress={SelectCafe} /> // Render Input Pin button for web
        ) : (
          <Button label={"Next"} onPress={onNextButtonPress} /> // Render Scan QR button for app
        )}
      </View>
    </View>
  );
};

export default PayNow;
