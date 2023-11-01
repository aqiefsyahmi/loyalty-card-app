import { memo } from "react";
import { formatTime, formatDate } from "../utils/formatTime";

import NB40TransactionItem from "./NB40TransactionItem";
import NB40dummyData from "./NB40dummyData"; // Import your dummy data here

const NB40TransactionList = ({ user, navigation, style, border, slice }) => {
  const dataToUse = slice ? NB40dummyData.slice(0, 5) : NB40dummyData;

  return (
    <>
      {dataToUse.map(
        (
          {
            amount,
            created_at,
            created_on,
            transaction_id,
            cafe_name,
            approved_by_recipient,
          },
          i
        ) => {
          let details = {
            sender: `${cafe_name}`,
            transactionId: transaction_id,
            amount: `RM${amount}`,
            date: `${formatDate(created_on)} at ${formatTime(created_at)}`,
          };

          return (
            <NB40TransactionItem
              key={i}
              transactionId={transaction_id}
              field1={details.sender}
              approved={approved_by_recipient}
              time={formatTime(created_at)}
              date={formatDate(created_on)}
              amount={amount}
              noBorder={!border && i === 0}
              navigate={() => {
                navigation.navigate("Transaction Details", {
                  data: details,
                });
              }}
              style={style}
            />
          );
        }
      )}
    </>
  );
};

export default memo(NB40TransactionList);
