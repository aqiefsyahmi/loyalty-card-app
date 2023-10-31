import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Profile from "../../components/Profile";
import Amount from "../../components/Amount";
import TransactionContainer from "../../components/TransactionContainer";
import Button from "../../components/Button";
import { globals, dashboardStyle } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";

import { socket } from "../../services/socketInstance";
import { useUserContext } from "../../hooks/useUserContext";

const B40Dashboard = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const [profile, setProfile] = useState({});

  const handlePay = () => {
    navigation.navigate("PayNow"); // Replace route name
  };
  const handleCP = () => {
    navigation.navigate("B40CollectPoint"); // Replace route name
  };
  const handleCR = () => {
    navigation.navigate("B40ClaimReward"); // Replace route name
  };

  useEffect(() => {
    socket.emit("student:get-wallet-total", { matricNo: user?.id });
    socket.on("student:get-wallet-total", (res) => {
      setProfile(res);
      console.log(res);
    });
  }, []);

  return (
    <View style={globals.container}>
      <View style={[dashboardStyle.logoutContainer, { marginTop: 16 }]}>
        <Profile textField1={"Muhammad Hazman"} textField2={"062711"} />
      </View>
      <View style={{ marginTop: 24 }}>
        <Amount
          amount={`RM ${profile?.coupon?.total}.00`}
          subTitle={"Total coupon"}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"Pay"} onPress={handlePay} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"Collect Point"} onPress={handleCP} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"Claim Reward"} onPress={handleCR} />
      </View>
      <View style={{ marginTop: 40, marginBottom: 24 }}>
        <View style={[dashboardStyle.transactionHeaderWrap]}>
          <Text style={dashboardStyle.transactionHeader}>
            Recent transaction
          </Text>
          <FeatherIcon
            name="more-horizontal"
            size={25}
            onPress={() => navigation.navigate("Transactions")}
          />
        </View>
        <TransactionContainer>
          <Text
            style={[
              dashboardStyle.transactionHeader,
              { marginTop: 24, marginBottom: 24 },
            ]}
          >
            No recent transactions
          </Text>
        </TransactionContainer>
      </View>
    </View>
  );
};

export default B40Dashboard;
