import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

export default bot

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

bot.on('/ai', (msg) => {
    query({"inputs": msg.text.substring(4)}).then((response) => {
        bot.sendMessage(msg.from.id, JSON.stringify(response));
    });
});

bot.start();
