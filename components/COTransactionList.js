import { memo } from "react";
import { formatTime, formatDate } from "../utils/formatTime";

import COTransactionItem from "./COTransactionItem";
import COdummyData from "./COdummyData"; // Import your dummy data here

const COTransactionList = ({ user, navigation, style, border, slice }) => {
  const dataToUse = slice ? COdummyData.slice(0, 5) : COdummyData;

  return (
    <>
      {dataToUse.map(
        (
          {
            sender,
            amount,
            created_at,
            created_on,
            transaction_id,
            cafe_name,
            student_name,
            approved_by_recipient,
          },
          i
        ) => {
          let details = {
            sender: `${student_name} - ${sender}`,
            recipient: cafe_name,
            transactionId: transaction_id,
            amount: `RM${amount}`,
            date: `${formatDate(created_on)} at ${formatTime(created_at)}`,
          };

          return (
            <COTransactionItem
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

export default memo(COTransactionList);
