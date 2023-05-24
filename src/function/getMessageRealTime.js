import { getNotification, deleteNotification } from '../api/greenApi';

export const getMessageRealTime = async (dataMessage) => {
  const idInstance = sessionStorage.getItem('idInstance');
  const apiToken = sessionStorage.getItem('apiToken');
  const data = await getNotification(idInstance, apiToken);

  if (data === null) return 'Сообщений не было';
  const idMessage = data.receiptId;

  if (data.body.messageData === undefined) {
    await deleteNotification(idInstance, apiToken, idMessage);
    return 'Сообщений не было';
  }

  const typeMessage = data.body.messageData.typeMessage;

  if (typeMessage === 'extendedTextMessage') {
    await deleteNotification(idInstance, apiToken, idMessage);
    return 'Сообщений не было';
  }

  if (typeMessage === 'textMessage') {
    const textMessage = data.body.messageData.textMessageData.textMessage;
    const timeMessage = new Date();
    const newDataMsg = [...dataMessage, {
      textMessage,
      id: timeMessage.getMilliseconds(),
      name: 'left',
      time: `${timeMessage.getHours()}:${timeMessage.getMinutes()}`,
    },
    ];

    await deleteNotification(idInstance, apiToken, idMessage);
    return newDataMsg;
  }
};
