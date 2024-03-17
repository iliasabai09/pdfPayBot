import {startMessage} from "../messages/start.message.js";
import {messageParser} from "../mappers/messageParser.js";
import {setInstagramMessage} from "../messages/setInstagramMessage.js";
import {UserUseCase} from "../use-cases/user.use-case.js";
import {USER_ACTIVE_STATUS} from "../shared/constants/constants.js";
import {validateInstagram} from "../validators/validateInstagram.js";
import {setCheckMessage} from "../messages/setCheckMessage.js";
import {validatePdf} from "../validators/validatePdf.js";

export async function messageSender(msg, bot) {
    const {
        first_name,
        chat_id,
        username,
        message
    } = messageParser(msg);
    const {status} = UserUseCase.getUserFromCache(msg);

    try {
        if (message === '/start') {
            UserUseCase.setStartedStatus(chat_id);
            return bot.sendMessage(chat_id, startMessage(first_name));
        }

        if (message === '/set_instagram') {
            UserUseCase.setAwaitInstagramStatus(chat_id);
            return bot.sendMessage(chat_id, setInstagramMessage)
        }

        if (message === '/set_check') {
            UserUseCase.setAwaitCheckStatus(chat_id);
            return bot.sendMessage(chat_id, setCheckMessage)
        }

        if (message === '/finish') {
            await UserUseCase.saveUserToBd(chat_id, bot);
            return bot.sendMessage(chat_id, 'Заявка успешно сохранена! 🤣')
        }

        if (status === USER_ACTIVE_STATUS.AWAIT_INSTAGRAM_SEND) {
            validateInstagram(message);
            UserUseCase.setInstagramToUser(chat_id, message);
            return bot.sendMessage(chat_id, 'Инстаграм успешно добавлен еслы вы завершили все шаги введите команду /finish')
        }

        if (status === USER_ACTIVE_STATUS.AWAIT_PAY) {
            validatePdf(msg);
            await UserUseCase.setCheckToUser(chat_id, bot, msg);
            return bot.sendMessage(chat_id, 'Чек об оплате успешно добавлен еслы вы завершили все шаги введите команду /finish')
        }

        return bot.sendMessage(chat_id, 'Введите команду /start для обработки заявки на участие')
    } catch (e) {
        return bot.sendMessage(chat_id, e.message);
    }
}

