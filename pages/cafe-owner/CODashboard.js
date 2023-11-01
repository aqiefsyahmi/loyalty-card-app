import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Profile from "../../components/Profile";
import COAmount from "../../components/COAmount";
import TransactionContainer from "../../components/TransactionContainer";
import COTransactionList from "../../components/COTransactionList";
import COdummyData from "../../components/COdummyData";
import Button from "../../components/Button";
import { globals, dashboardStyle } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";

const CODashboard = () => {
  const navigation = useNavigation();

  const showTransaction = () => {
    navigation.navigate("COTransaction"); // Replace route name
  };
  const handleShowQR = () => {
    navigation.navigate("COShowQR"); // Replace route name
  };
  const handleShowPIN = () => {
    navigation.navigate("COShowPIN"); // Replace route name
  };

  return (
    <View style={globals.container}>
      <View style={[dashboardStyle.logoutContainer, { marginTop: 16 }]}>
        <Profile textField1={"Kafe Ali Baba"} textField2={"alibaba01"} />
      </View>
      <View style={{ marginTop: 24 }}>
        <COAmount amount={"430.00"} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"My QRCode"} onPress={handleShowQR} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"One-Time PIN Generator"} onPress={handleShowPIN} />
      </View>
      <View style={{ marginTop: 40, marginBottom: 24 }}>
        <View style={[dashboardStyle.transactionHeaderWrap]}>
          <Text style={dashboardStyle.transactionHeader}>
            Recent transaction
          </Text>
          <FeatherIcon
            name="more-horizontal"
            size={25}
            onPress={showTransaction}
          />
        </View>
        <TransactionContainer>
          <COTransactionList data={COdummyData} />
        </TransactionContainer>
      </View>
    </View>
  );
};

export default CODashboard;
