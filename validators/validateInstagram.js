export function validateInstagram(message) {
    if (!message.includes('instagram.com')) throw new Error('Отправьте правильную ссылку на профиль')
}

/*
* export function validateInstagram(message) {
    const regex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_\.]+\/?$/;
    if (!regex.test(message)) throw new Error('Отправьте правильную ссылку на профиль')
}
* */
