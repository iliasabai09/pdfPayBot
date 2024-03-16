const TelegramApi = require("node-telegram-bot-api");
const axios = require("axios");
const token = "6597188056:AAFS8Xq9cFgUQTI8dbWbg2XuyLb8EYv2gIU";

const bot = new TelegramApi(token, {polling: true});

function setUser(data) {
    try {
        axios.post('https://phrases-ae88c-default-rtdb.firebaseio.com/users.json', JSON.stringify(data)).then();
    } catch (e) {
        console.error(e.message)
    }
}

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    setUser(msg)
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
            console.error('Ошибка получения ссылки на файл:', error);
        });
    } else {
        bot.sendMessage(chatId, 'Пожалуйста, отправьте файл.');
    }
})

