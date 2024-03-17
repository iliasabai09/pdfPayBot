export function messageParser(msg) {
    if (!msg) throw new Error("Не удалось получить данные о пользователе");
    if (!msg?.chat) throw new Error("Не удалось получить данные по чату пользователя");
    if (!msg?.from) throw new Error('Произошла ошибка при получений данных о пользователе');
    return {
        first_name: msg.chat.first_name,
        chat_id: msg.chat.id,
        username: msg.chat.username,
        message: msg.text
    }
}
