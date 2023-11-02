import React, { useEffect, useState } from "react";
import { View, ScrollView, Platform } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import { Button, Refresh } from "../../components";
import { globals } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/axiosInstance";

const PayCafeWeb = () => {
  const navigation = useNavigation();
  const [radioBtn, setRadioBtn] = useState([]);

  useEffect(() => {
    // Initialize the radio buttons state with the local cafe data
    setRadioBtn(localCafeData);
  }, []);

  const localCafeData = [
    { id: 1, label: "Starbucks Malaysia", value: "starbucks", selected: false },
    {
      id: 2,
      label: "Coffee Bean & Tea Leaf",
      value: "coffeebean",
      selected: false,
    },
    { id: 3, label: "OldTown White Coffee", value: "oldtown", selected: false },
    { id: 4, label: "Dome Cafe", value: "domecafe", selected: false },
    { id: 5, label: "PappaRich", value: "papparich", selected: false },
    { id: 6, label: "Tealive", value: "tealive", selected: false },
    {
      id: 7,
      label: "Secret Recipe Cafe",
      value: "secretrecipe",
      selected: false,
    },
    {
      id: 8,
      label: "San Francisco Coffee",
      value: "sanfrancisco",
      selected: false,
    },
    { id: 9, label: "Marrybrown Cafe", value: "marrybrown", selected: false },
    { id: 10, label: "The Alley", value: "thealley", selected: false },
    { id: 11, label: "Gong Cha", value: "gongcha", selected: false },
    {
      id: 12,
      label: "Kenny Rogers Roasters",
      value: "kennyrogers",
      selected: false,
    },
    { id: 13, label: "Toast Box", value: "toastbox", selected: false },
    {
      id: 14,
      label: "Pacific Coffee",
      value: "pacificcoffee",
      selected: false,
    },
    { id: 15, label: "Chatime", value: "chatime", selected: false },
    { id: 16, label: "Nescafe Cafe", value: "nescafe", selected: false },
    { id: 17, label: "Coffee Zone", value: "coffeezone", selected: false },
    { id: 18, label: "Coffee Lab", value: "coffeelab", selected: false },
    {
      id: 19,
      label: "Coffee Culture",
      value: "coffeeculture",
      selected: false,
    },
    { id: 20, label: "Coffee Heaven", value: "coffeeheaven", selected: false },
    { id: 21, label: "Brew & Bread", value: "brewbread", selected: false },
    {
      id: 22,
      label: "Black Canyon Coffee",
      value: "blackcanyon",
      selected: false,
    },
    { id: 23, label: "Coffee World", value: "coffeeworld", selected: false },
    {
      id: 24,
      label: "Coffee Chemistry Signature",
      value: "coffeechemistry",
      selected: false,
    },
    {
      id: 25,
      label: "Pacific Coffee",
      value: "pacificcoffee",
      selected: false,
    },
    { id: 26, label: "The Coffee Club", value: "coffeecafe", selected: false },
    { id: 27, label: "Brew & Stone", value: "brewstone", selected: false },
    { id: 28, label: "Brewyard Coffee", value: "brewyard", selected: false },
    { id: 29, label: "Cafe Barbera", value: "barberacafe", selected: false },
    { id: 30, label: "Cafe Amazon", value: "cafeamazon", selected: false },
    // Add more cafes as needed
  ];

  const toDashboard = () => {
    // You can add your authentication logic here
    // If authentication is successful, navigate to the "Dashboard" screen
    navigation.navigate("B40Dashboard"); // Replace "Dashboard" with your route name
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
        console.log(res);
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
        <Button label={"Pay"} onPress={toDashboard} />
      </View>
    </View>
  );
};

export default PayCafeWeb;
