import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getStateInstance } from '../api/greenApi';
import { validAuth } from '../function/validAuth';
import { toastMessage } from '../function/toastMessage';
import { TiDelete } from 'react-icons/ti';
import { CiLogin } from 'react-icons/ci';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/auth.scss';

function Auth() {
  const navigate = useNavigate();
  const [validMessage, setValidMessage] = useState('');
  const [userData, setUserData] = useState({
    IdInstance: '',
    ApiToken: '',
  });

  const changeUserData = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const resetValue = value => {
    setUserData({ ...userData, [value]: '' });
  };

  const handleLogin = async e => {
    const message = validAuth(userData);
    if (message) return setValidMessage(message);

    e.preventDefault();
    const res = await getStateInstance(userData.IdInstance, userData.ApiToken);
    if (typeof res === 'string') return toastMessage(res);

    sessionStorage.setItem('idInstance', userData.IdInstance);
    sessionStorage.setItem('apiToken', userData.ApiToken);
    setValidMessage('');
    setUserData({
      IdInstance: '',
      ApiToken: '',
    });

    navigate('/');
  };

  return (
    <>
      <ToastContainer />
      <div className='auth'>
        <form>
          <h1>GREEN API</h1>
          <div className='auth__input'>
            <input
              type='text'
              name='IdInstance'
              id='IdInstance'
              value={userData.IdInstance}
              placeholder='Введите id'
              autocomplete='off'
              required
              onChange={changeUserData}
            />
            <label htmlFor='IdInstance'>
              <TiDelete
                onClick={() => resetValue('IdInstance')}
                className={userData.IdInstance.length === 0 ? 'hide' : 'icon'}
              />
            </label>
          </div>
          <div className='auth__input'>
            <input
              type='text'
              name='ApiToken'
              id='ApiToken'
              value={userData.ApiToken}
              placeholder='Введите api token'
              autocomplete='off'
              required
              onChange={changeUserData}
            />
            <label htmlFor='ApiToken'>
              <TiDelete
                onClick={() => resetValue('ApiToken')}
                id='resetToken'
                className={userData.ApiToken.length === 0 ? 'hide' : 'icon'}
              />
            </label>
          </div>
          <div className='auth__submit'>
            <button type='submit' onClick={handleLogin}>
              Войти <CiLogin />
            </button>
            <span className='auth__error-message'>{validMessage}</span>
          </div>
          <h3 className='auth__redirect-green-api'>
            Для получения id и api token, перейдите по ссылке <br />
            <a href='https://green-api.com/' target='_blank' rel='noreferrer'>
              green-api.com
            </a>{' '}
            и зарегистрируйтесь!
          </h3>
        </form>
      </div>
    </>
  );
}

export default Auth;
