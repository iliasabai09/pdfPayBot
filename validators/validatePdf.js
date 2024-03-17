export function validatePdf(msg) {
    if (!msg?.document || !msg.document.file_name.includes('.pdf')) throw new Error('Неправильный формат чека')
}
