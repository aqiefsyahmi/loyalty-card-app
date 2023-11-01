import { Text, View, Platform } from "react-native";

import { globals, transactionStyle } from "../../styles";
import TransactionContainer from "../../components/TransactionContainer";
import NB40TransactionList from "../../components/NB40TransactionList";
import NB40dummyData from "../../components/NB40dummyData";

const NB40Transaction = () => {
  return (
    <View style={[globals.container]}>
      <TransactionContainer>
        <NB40TransactionList data={NB40dummyData} />
      </TransactionContainer>
    </View>
  );
};

export default NB40Transaction;
