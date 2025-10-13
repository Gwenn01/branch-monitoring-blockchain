// utils/fetchTxHistory.js
export async function fetchTxHistory(walletAddress) {
  const API_KEY = "3NWZUPZXNSB1PPPDBKYWV29PEPPGNM52C3"; // ⚠️ Get from https://basescan.org/myapikey

  const url = `https://api.basescan.org/api
    ?module=account
    &action=txlist
    &address=${walletAddress}
    &startblock=0
    &endblock=99999999
    &sort=desc
    &apikey=${API_KEY}`.replace(/\s+/g, "");

  const res = await fetch(url);
  const data = await res.json();
  console.log("🔍 BaseScan response:", data);


  if (data.status !== "1" || !data.result) {
    return [];
  }

  return data.result.map((tx) => ({
    hash: tx.hash,
    from: tx.from.toLowerCase(),
    to: tx.to?.toLowerCase(),
    value: (Number(tx.value) / 1e18).toFixed(4),
    time: new Date(tx.timeStamp * 1000).toLocaleString(),
  }));
}
