import TeleBot from "telebot";
import fetch from "node-fetch";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

bot.on("text", async msg => {
  const response = await query({ inputs: msg.text });
  msg.reply.text(JSON.stringify(response.outputs));
});

export default bot;
