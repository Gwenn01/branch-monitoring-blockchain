export default function TransactionExplorer() {
  const transactions = [
    { to: "0x1334...5928", type: "Achieve", branch: "Cebu", amount: 6000 },
    { to: "0x1334...5676", type: "None", branch: "Manila", amount: 6000 },
    { to: "0x1353...5379", type: "Confirmed", branch: "Davao", amount: 2400 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction Explorer</h2>
      <div className="bg-cardDark rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th>To</th>
              <th>Type</th>
              <th>Branch</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                <td>{tx.to}</td>
                <td>{tx.type}</td>
                <td>{tx.branch}</td>
                <td>₱{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
