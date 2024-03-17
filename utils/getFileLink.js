export async function getFileLink(msg, bot) {
    try {
        const fileId = msg.document.file_id;
        return await bot.getFileLink(fileId)
    } catch (e) {
        throw new Error('Ошибка при получений документа повторите попытку')
    }
}
