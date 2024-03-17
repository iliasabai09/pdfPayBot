import TelegramApi from "node-telegram-bot-api";

export class NotificateTelegramService {
    static token = "6597188056:AAFS8Xq9cFgUQTI8dbWbg2XuyLb8EYv2gIU";
    static bot = new TelegramApi(this.token, {polling: true});

    static async setSavedUser(user) {
        const chat_id = 5000816492;
        await this.bot.sendMessage(chat_id, `Пользователь по никнейму @${user.username} оставил заявку!\n Чек по оплате: ${user.pdfUrl}`);
    }
}
