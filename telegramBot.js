const { Telegraf } = require("telegraf");
require("dotenv").config();

const { TELEGRAM_TOKEN_API } = process.env;
const telegramBot = new Telegraf(TELEGRAM_TOKEN_API);

const sendTelegramMessage = (timer) => {
	telegramBot.telegram.sendMessage(
		"-739930581",
		`Binance button game: current timer is ${timer}`
	);
};

module.exports = sendTelegramMessage;
