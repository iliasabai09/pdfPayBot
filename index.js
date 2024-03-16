import TelegramApi from "node-telegram-bot-api";
import ExcelJS from "exceljs";

const token = "6597188056:AAFS8Xq9cFgUQTI8dbWbg2XuyLb8EYv2gIU";
const workbook = new ExcelJS.Workbook();
const bot = new TelegramApi(token, {polling: true});


bot.on("message", async (msg) => {
	const chatId = msg.chat.id;
	const username = msg.from.username;

	if (msg.document) {
		// Получаем информацию о файле
		const fileId = msg.document.file_id;
		const username = msg.from.username;
		// Получаем ссылку на файл
		bot.getFileLink(fileId).then((fileLink) => {
			// Отправляем ссылку обратно в чат
			bot.sendMessage(chatId, `Ссылка на файл: ${fileLink}`);
			bot.sendMessage(5000816492, `Пользователь @${username} отправил документ ${fileLink}`);
		}).catch((error) => {
			console.error("Ошибка получения ссылки на файл:", error);
		});
	} else {
		bot.sendMessage(chatId, "Пожалуйста, отправьте файл.");
	}
});


async function sendFile(chatId) {
	bot.sendDocument(chatId, "example.xlsx")
		.then(sent => {
			console.log('Документ успешно отправлен:', sent);
		})
		.catch(error => {
			console.error('Ошибка при отправке документа:', error);
		});
}
