import {saveUserMapper} from "../mappers/saveUser.mapper.js";
import {NodeCacheService} from "../services/cache.service.js";
import {USER_ACTIVE_STATUS} from "../shared/constants/constants.js";
import {getFileLink} from "../utils/getFileLink.js";
import {createUser} from "../services/firebase.service.js";
import {validateUserSave} from "../validators/validateUserSave.js";
import {NotificateTelegramService} from "../services/notificateTelegram.service.js";

export class UserUseCase {
    static setUserToCache(message) {
        const user = saveUserMapper(message);
        NodeCacheService.setCache(user.chat_id, user);
    }

    static getUserFromCache(message) {
        const user = saveUserMapper(message);
        console.log(NodeCacheService.getCache(user.chat_id))
        return NodeCacheService.getCache(user.chat_id);
    }

    static setStartedStatus(chat_id) {
        const user = NodeCacheService.getCache(chat_id);
        user.status = USER_ACTIVE_STATUS.STARTED;
        NodeCacheService.setCache(user.chat_id, user);
    }

    static setAwaitInstagramStatus(chat_id) {
        const user = NodeCacheService.getCache(chat_id);
        user.status = USER_ACTIVE_STATUS.AWAIT_INSTAGRAM_SEND;
        NodeCacheService.setCache(user.chat_id, user);
    }

    static setAwaitCheckStatus(chat_id) {
        const user = NodeCacheService.getCache(chat_id);
        user.status = USER_ACTIVE_STATUS.AWAIT_PAY;
        NodeCacheService.setCache(user.chat_id, user);
    }

    static setInstagramToUser(chat_id, message) {
        const user = NodeCacheService.getCache(chat_id);
        user.status = USER_ACTIVE_STATUS.STARTED;
        user.instagram = message;
        NodeCacheService.setCache(user.chat_id, user);
    }

    static async setCheckToUser(chat_id, bot, msg) {
        const user = NodeCacheService.getCache(chat_id);
        user.status = USER_ACTIVE_STATUS.STARTED;
        user.pdfUrl = await getFileLink(msg, bot);
        NodeCacheService.setCache(user.chat_id, user);
    }

    static async saveUserToBd(chat_id, bot) {
        try {
            const user = NodeCacheService.getCache(chat_id);
            validateUserSave(user);
            await createUser(user);
            await NotificateTelegramService.setSavedUser(user);
            NodeCacheService.deleteCache(chat_id, bot);
        } catch (e) {
            throw new Error(e.message)
        }

    }
}
