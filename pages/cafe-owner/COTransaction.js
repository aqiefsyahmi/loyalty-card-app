import { Text, View, Platform } from "react-native";

import { globals, transactionStyle } from "../../styles";
import TransactionContainer from "../../components/TransactionContainer";
import COTransactionList from "../../components/COTransactionList";
import COdummyData from "../../components/COdummyData";

const COTransaction = () => {
  return (
    <View style={[globals.container]}>
      <TransactionContainer>
        <COTransactionList data={COdummyData} />
      </TransactionContainer>
    </View>
  );
};

export default COTransaction;
