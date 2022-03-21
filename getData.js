const puppeteer = require("puppeteer");

const sendTelegramMessage = require("./telegramBot");

const binanceURL = "https://www.binance.com/en/activity/bitcoin-button-game";

const getData = async () => {
	try {
		const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
		const [page] = await browser.pages();

		await page.goto(binanceURL, { waitUntil: "networkidle0" });

		const data = await page.evaluate(() =>
			Array.from(document.querySelectorAll(".css-w39bvu")).map(
				(elem) => elem.textContent
			)
		);
		// TELEGRAM
		console.log(data);
		if (data[0] === "5") {
			// sendTelegramMessage(
			// 	`Binance button game: current timer is ${data[0]}${data[1]}:${data[2]}${data[3]}`
			// );
		}

		await browser.close();
	} catch (err) {
		console.error(err);
	}
};

// const getData = (callback) => {
// 	request(url, function (error, response, html) {
// 		if (!error && response.statusCode == 200) {
// 			const $ = cheerio.load(html);
// 			var $el = $(".css-w39bvu");

// 			if ($el.length) {
// 				console.log($el.text());
// 			} else {
// 				console.log("hey");
// 			}
// 		}
// 	});
// };

module.exports = getData;
