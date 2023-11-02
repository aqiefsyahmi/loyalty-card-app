import React, { useEffect, useState } from "react";
import { View, ScrollView, Platform } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import { Button, Refresh } from "../../components";
import { globals } from "../../styles";
import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/axiosInstance";
import { useUserContext } from "../../hooks/useUserContext";
import { socket } from "../../services/socketInstance";

const PayCafeWeb = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { amount } = route.params;
  const [radioBtn, setRadioBtn] = useState([]);

  const onPay = async () => {
    const selectedCafe = radioBtn.filter(({ selected }) => selected === true);

    try {
      await api.post("/student/pay", {
        matricNo: user?.id,
        cafeId: selectedCafe[0].value,
        amount: amount,
      });
      // push notification then nav to dashboard

      // emit event
      socket.emit("student:get-wallet-total", { matricNo: user?.id });
      socket.emit("admin:get-overall");

      navigation.navigate("B40Dashboard"); // Replace "Dashboard" with your route name
      // console.log({ amount: amount, select: selectedCafe[0].value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRadioButtonChange = (id) => {
    // Create a new array to update the radio buttons' state
    const updatedRadioBtn = radioBtn.map((btn) => ({
      ...btn,
      selected: btn.id === id,
    }));
    setRadioBtn(updatedRadioBtn);
  };

  useEffect(() => {
    api
      .get("/student/cafe")
      .then((res) => {
        let cafeList = res.data.data.map((data, i) => ({
          id: i,
          label: data.name,
          value: data.id,
          selected: false,
        }));

        setRadioBtn(cafeList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <View style={[globals.container]}>
      <ScrollView style={{ flex: 1, marginVertical: 16 }}>
        {radioBtn.map(({ id, label, value, selected }) => {
          return (
            <RadioButton
              key={id}
              id={id}
              label={label}
              value={value}
              selected={selected}
              labelStyle={{ fontSize: 16 }}
              containerStyle={{ marginTop: 16 }}
              onPress={() => handleRadioButtonChange(id)} // Handle button press
            />
          );
        })}
      </ScrollView>
      <View style={{ paddingBottom: 24, paddingHorizontal: 16 }}>
        <Button label={"Pay"} onPress={onPay} />
      </View>
    </View>
  );
};

export default PayCafeWeb;
