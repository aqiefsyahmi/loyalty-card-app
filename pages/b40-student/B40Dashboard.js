import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Profile from "../../components/Profile";
import Amount from "../../components/Amount";
import TransactionContainer from "../../components/TransactionContainer";
import Button from "../../components/Button";
import B40TransactionList from "../../components/B40TransactionList";
import B40dummyData from "../../components/B40dummyData";
import { globals, dashboardStyle } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";

import { socket } from "../../services/socketInstance";
import { useUserContext } from "../../hooks/useUserContext";
import { api } from "../../services/axiosInstance";

const B40Dashboard = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const [coupon, setCoupon] = useState(0);
  const [name, setName] = useState("...");

  const showTransaction = () => {
    navigation.navigate("B40Transaction"); // Replace route name
  };
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
    api
      .get(`/student/${user?.id}`)
      .then((res) => {
        setName(res.data.student.user.profile.name);
      })
      .catch((err) => {
        console.error(err);
      });
    socket.emit("student:get-wallet-total", { matricNo: user?.id });
    socket.on("student:get-wallet-total", (res) => {
      setCoupon(res.coupon.total);
      console.log(res.transaction.transaction);
    });
  }, [socket]);

  return (
    <View style={globals.container}>
      <View style={[dashboardStyle.logoutContainer, { marginTop: 16 }]}>
        <Profile textField1={name} textField2={user?.id} />
      </View>
      <View style={{ marginTop: 24 }}>
        <Amount amount={`RM ${coupon}.00`} subTitle={"Total coupon"} />
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
            onPress={showTransaction}
          />
        </View>
        <TransactionContainer>
          {/* <Text
            style={[
              dashboardStyle.transactionHeader,
              { marginTop: 24, marginBottom: 24 },
            ]}
          >
            No recent transactions
          </Text> */}
          <B40TransactionList data={B40dummyData} />
        </TransactionContainer>
      </View>
    </View>
  );
};

export default B40Dashboard;
