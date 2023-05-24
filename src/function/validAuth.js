export const validAuth = (data) => {
  if (data.IdInstance === '' && data.ApiToken === '') {
    return 'Заполните все поля!';
  }

  if (data.IdInstance === '') {
    return 'Укажите свой IdInstance. Пример "1191823292"';
  }

  if (data.ApiToken === '') {
    return 'Укажите свой ApiTokenInstance. Пример "cbe5864..."';
  }

  return '';
};
