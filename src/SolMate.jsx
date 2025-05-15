import React, { useState } from "react";

export default function SolMate() {
  const [pubKey, setPubKey] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fakeMatches = [
    {
      name: "wallet_9xJz...",
      compatibility: "93%",
      traits: ["Staked $BONK early", "Minted a rug in 2022", "Loves Raydium"]
    },
    {
      name: "wallet_2bVq...",
      compatibility: "88%",
      traits: ["HODLs $JTO", "Traded NFTs weekly", "Interacted with Jupiter"]
    },
    {
      name: "wallet_d3Lp...",
      compatibility: "96%",
      traits: ["Airdrop farmer", "Holds rare Solana NFT", "Never sold $SAMO"]
    },
    {
      name: "wallet_4kXz...",
      compatibility: "90%",
      traits: ["Staked $SOL early", "Used Mango Markets", "Likes degenerate yield farms"]
    },
    {
      name: "wallet_degen99...",
      compatibility: "69%",
      traits: ["Minted 12 rugs in a single night", "FOMOed $DOGE on Solana", "Wrote a trading bot that lost everything"]
    },
    {
      name: "wallet_rugPullLord...",
      compatibility: "77%",
      traits: ["Still holding a presale from 2021", "Interacts with sketchy AMMs", "Buys top, sells bottom"]
    }
  ];

  const findMatch = () => {
    if (!pubKey) return;
    setLoading(true);
    setMatchResult(null);
    setTimeout(() => {
      const randomMatch = fakeMatches[Math.floor(Math.random() * fakeMatches.length)];
      setMatchResult(randomMatch);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white flex flex-col items-center justify-center p-6 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">🔗 Love, on-chain.</h1>
        <p className="text-xl max-w-xl mx-auto">
          SolMate is a playful Solana dApp that matches crypto wallets based on their degenerate on-chain behavior.
          No swiping — just vibes, rugs, and poor decisions.
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
            Scanning rugged tx history and meme coin stashes... 💘
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

      <div className="bg-white text-purple-900 rounded-2xl p-8 shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">💘 How it Works</h2>
        <ol className="space-y-4 text-lg">
          <li><strong>1. Enter your wallet address</strong> – We scan your public degen history: rugs, apes, and LPs.</li>
          <li><strong>2. Run the love algorithm</strong> – Powered by MEV, chaos theory, and just vibes.</li>
          <li><strong>3. Find your match</strong> – Your soulmate also bought $PEPE on launch and held through the dip.</li>
        </ol>
      </div>

      <footer className="text-center text-sm opacity-70">
        © 2025 SolMate ❤️ Built on Solana · Powered by Rust, Anchor & poor financial decisions.
      </footer>
    </div>
  );
}
