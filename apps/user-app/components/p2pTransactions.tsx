import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
  transactions
}: {
  transactions: {
    time: Date;
    amount: number;
    type: "sent" | "received";
    phoneNumber: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent P2P Transactions">
        <div className="text-center pb-8 pt-8">
          No Recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent P2P Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, idx) => {
          const isSent = t.type === "sent";

          return (
            <div key={idx} className="flex justify-between">
              <div>
                <div className="text-sm">
                  {isSent
                    ? `Sent to ${t.phoneNumber}`
                    : `Received from ${t.phoneNumber}`}
                </div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>

              <div
                className={`flex flex-col justify-center ${
                  isSent ? "text-red-600" : "text-green-600"
                }`}
              >
                {isSent ? "- " : "+ "}Rs {t.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};