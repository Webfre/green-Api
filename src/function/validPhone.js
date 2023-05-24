export const validPhone = (str) => {
  const string =
    str.replace(/ /g, '') // Удалить все пробелы из строки
      .replace(/[a-zа-яё]/gi, '') // Удалить все буквы
      .replace(/[^a-zа-яё0-9\s]/gi, ' '); // Удалите специальные символы

  return string;
};