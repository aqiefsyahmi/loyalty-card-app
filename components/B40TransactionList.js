import { memo } from "react";
import { formatTime, formatDate } from "../utils/formatTime";

import B40TransactionItem from "./B40TransactionItem";
import dummyData from "./B40dummyData"; // Import your dummy data here

const TransactionList = ({ user, navigation, style, border, slice }) => {
  const dataToUse = slice ? dummyData.slice(0, 5) : dummyData;

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
            recipient: `${cafe_name}`,
            transactionId: transaction_id,
            amount: `RM${amount}`,
            date: `${formatDate(created_on)} at ${formatTime(created_at)}`,
          };

          return (
            <B40TransactionItem
              key={i}
              transactionId={transaction_id}
              field1={details.recipient}
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

export default memo(TransactionList);
