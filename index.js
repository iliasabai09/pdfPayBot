import TelegramApi from "node-telegram-bot-api";
import {botCommands} from "./commands/bot_commands.js";
import {UserUseCase} from "./use-cases/user.use-case.js";
import {messageSender} from "./sender/messageTypes.js";

const token = "6597188056:AAFS8Xq9cFgUQTI8dbWbg2XuyLb8EYv2gIU";
const bot = new TelegramApi(token, {polling: true});

await bot.setMyCommands(botCommands);
bot.on("message", async (msg) => {
	if (!UserUseCase.getUserFromCache(msg)) UserUseCase.setUserToCache(msg);
	await messageSender(msg, bot)
});

