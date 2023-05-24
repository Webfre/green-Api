export const dataContacts = (phone) => {
  const data = sessionStorage.getItem('Contacts');

  if (!data) {
    sessionStorage.setItem('Contacts', JSON.stringify([phone]));
  } else {
    const dataPhone = JSON.parse(sessionStorage.getItem('Contacts'));
    if (dataPhone.includes(phone)) return true;

    sessionStorage.setItem('Contacts',
      JSON.stringify([...JSON.parse(data), phone]));
  }
};