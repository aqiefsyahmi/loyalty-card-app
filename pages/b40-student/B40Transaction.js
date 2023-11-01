import { Text, View, Platform } from "react-native";

import { globals, transactionStyle } from "../../styles";
import TransactionContainer from "../../components/TransactionContainer";
import B40TransactionList from "../../components/B40TransactionList";
import B40dummyData from "../../components/B40dummyData";

const B40Transaction = () => {
  return (
    <View style={[globals.container]}>
      <TransactionContainer>
        <B40TransactionList data={B40dummyData} />
      </TransactionContainer>
    </View>
  );
};

export default B40Transaction;
