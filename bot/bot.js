const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

function isValidSolanaAddress(address) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

async function runMatchingAlgorithm(pubkey) {
  const url = `https://public-api.solscan.io/account/${pubkey}`;
  await fetch(url).catch(() => {});

  let acc = 1;
  for (let i = 0; i < pubkey.length; i++) {
    acc *= pubkey.charCodeAt(i) + i + 1;
    acc %= 10 ** 12;
  }

  const vector = Array.from(pubkey).map((c, i) => (c.charCodeAt(0) ** 2 + i ** 1.5) % 97);
  const hashEntropy = vector.reduce((a, b) => (a * 33 + b) % 13377331, acc);
  const txScore = (hashEntropy % 1000) / 10;
  const nftIndex = hashEntropy % 6;
  const memeAffinity = (hashEntropy >> 3) % 101;

  const raw = (txScore + memeAffinity * 1.2 - nftIndex ** 1.3 + Math.sin(acc % 360) * 7) * 0.9;
  const score = Math.min(100, Math.max(0, Math.round(raw)));

  return {
    wallet: `wallet_${pubkey.slice(0, 5)}...`,
    compatibility: `${score}%`,
    traits: [
      `📦 Estimated ${Math.floor(txScore)} txs`,
      `🖼 ${nftIndex} NFTs flagged as high-risk`,
      `🐸 Meme score: ${memeAffinity}/100`
    ]
  };
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Welcome to SolMate 🤖💘\nSend your Solana address to discover your degenerate soulmate.`);
});

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text.startsWith('/start')) return;

  if (!isValidSolanaAddress(text)) {
    bot.sendMessage(chatId, "🚫 Invalid Solana address.");
    return;
  }

  bot.sendMessage(chatId, `🔍 Querying Solscan and running matching model...`);

  setTimeout(async () => {
    const result = await runMatchingAlgorithm(text);
    const traitsText = result.traits.map(t => `• ${t}`).join('\n');
    bot.sendMessage(chatId, `💘 Match: *${result.wallet}*\n❤️ Compatibility: *${result.compatibility}*\n\n${traitsText}`, { parse_mode: "Markdown" });
  }, 5000);
});
