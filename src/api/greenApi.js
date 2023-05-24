import axios from 'axios';
const BASE_URL = 'https://api.green-api.com';

// Получить состояние аккаунта
export const getStateInstance = async (idInstance, apiToken) => {
  try {
    return await axios.get(`${BASE_URL}/waInstance${idInstance}/getStateInstance/${apiToken}`);
  } catch (error) {
    return 'Ошибка авторизации попробуйте еще раз';
  }
};

// Отправить текст
export const postMessage = async (idInstance, apiToken, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/waInstance${idInstance}/sendMessage/${apiToken}`, message);

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

// Получить уведомление
export const getNotification = async (idInstance, apiToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiToken}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Удалить уведомление
export const deleteNotification = async (idInstance, apiToken, id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/waInstance${idInstance}/DeleteNotification/${apiToken}/${id}`);

    return response;
  } catch (error) {
    return error;
  }
};
