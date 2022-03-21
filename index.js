const express = require("express");
const puppeteer = require("puppeteer");
const { Telegraf } = require("telegraf");

require("dotenv").config();

const { TELEGRAM_TOKEN_API, PORT } = process.env;
const port = PORT || 8000;

const binanceURL = "https://www.binance.com/en/activity/bitcoin-button-game";

const bot = new Telegraf(TELEGRAM_TOKEN_API);

async function main() {
	try {
		const browser = await puppeteer.launch({
			ignoreDefaultArgs: ["--disable-extensions"],
		});
		const [page] = await browser.pages();

		await page.goto(binanceURL, { waitUntil: "networkidle0" });

		const data = await page.evaluate(() =>
			Array.from(document.querySelectorAll(".css-w39bvu")).map(
				(elem) => elem.textContent
			)
		);
		// TELEGRAM
		if (data[0] === "1") {
			bot.telegram.sendMessage(
				"-739930581",
				`Binance button game: current timer is ${data[0]}${data[1]}:${data[2]}${data[3]}`
			);
		}

		await browser.close();
	} catch (err) {
		console.error(err);
	}
}

setInterval(() => main(), 10000);

const app = express();

app.listen(port, () => console.log(`Scrapper running on PORT: ${port}`));
