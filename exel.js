import ExcelJS from "exceljs";

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('My Sheet');

// Записываем данные
workbook.xlsx.readFile("./example.xlsx")
	.then(() => {
		// Получаем рабочий лист
		const worksheet = workbook.getWorksheet(1);
		
		// Добавляем данные в таблицу
		worksheet.addRow(["New Data 1", "New Data 2", "New Data 3"]);
		
		// Сохраняем изменения в файл
		return workbook.xlsx.writeFile("example.xlsx");
	})
	.then(() => {
		console.log("Данные успешно добавлены в Excel-файл");
	})
	.catch(err => {
		console.error("Ошибка при записи в Excel-файл:", err);
	});
