export default function BranchPanel() {
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Branch Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Senuittom Park</h3>
          <p className="text-sm text-gray-400">Branch ID: 1001</p>
          <p className="mt-3">Amount: ₱6000</p>
          <button className="bg-accent mt-4 px-4 py-2 rounded-lg text-white">
            Submit to Branch
          </button>
        </div>

        <div className="bg-cardDark p-4 rounded-xl overflow-x-auto">
          <h3 className="font-semibold mb-2">Transaction History</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="p-2">Tx ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">0xD44</td>
                <td className="p-2">5000</td>
                <td className="p-2">21 Aug</td>
              </tr>
              <tr>
                <td className="p-2">0x135</td>
                <td className="p-2">6200</td>
                <td className="p-2">10:30 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
