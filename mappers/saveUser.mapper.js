export function saveUserMapper(user) {
	if (!user) throw new Error("Не удалось получить данные о пользователе");
	if (!user?.chat) throw new Error("Не удалось получить данные по чату пользователя");
	if (!user?.from) throw new Error('Произошла ошибка при получений данных о пользователе');
	return {
		first_name: user.chat.first_name,
		chat_id: user.chat.id,
		username: user.chat.username,
		instagram: '',
		pdfUrl: '',
		status: 'opened'
	}
}
