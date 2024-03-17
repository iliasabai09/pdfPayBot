export function validateUserSave(user) {
    if (!user.instagram) throw new Error('Вы не заполнили профиль инстаграм пожалуйста оставьте ссылку на инстаграм /set_instagram');
    if (!user.pdfUrl) throw new Error('Вы не отправили чек об оплате пожалуйста отправьте чек /set_check');
}
