export class NotificateTelegramService {
    static async setSavedUser(user,bot) {
        const chat_id = 5000816492;
        await bot.sendMessage(chat_id, `Пользователь по никнейму @${user.username} оставил заявку!\n Чек по оплате: ${user.pdfUrl}`);
    }
}
