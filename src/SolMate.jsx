import React, { useState } from "react";
import { runComplexMatchingAlgorithm } from "./algorithm";

export default function SolMate() {
  const [pubKey, setPubKey] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const findMatch = async () => {
    if (!pubKey) return;
    setLoading(true);
    setMatchResult(null);
    setTimeout(async () => {
      const result = await runComplexMatchingAlgorithm(pubKey);
      setMatchResult(result);
      setLoading(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white flex flex-col items-center justify-center p-6 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">🔗 Love, on-chain.</h1>
        <p className="text-xl max-w-xl mx-auto">
          SolMate matches wallets based on public on-chain data from Solana — txs, tokens, and NFT entropy.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your Solana public key"
            className="w-80 px-4 py-2 rounded-xl text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={pubKey}
            onChange={(e) => setPubKey(e.target.value)}
          />
          <div>
            <button
              onClick={findMatch}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-2xl shadow-md"
              disabled={loading}
            >
              {loading ? "Matching..." : "Find My Match"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="mt-6 text-purple-300 animate-pulse text-lg">
            Querying Solscan, analyzing entropy vectors, computing memetic deviation... 💘
          </div>
        )}

        {matchResult && !loading && (
          <div className="mt-6 bg-white text-purple-900 p-6 rounded-2xl shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-2">💘 You matched with {matchResult.name}</h3>
            <p className="text-lg font-semibold mb-2">Compatibility Score: {matchResult.compatibility}</p>
            <ul className="list-disc list-inside space-y-1">
              {matchResult.traits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
