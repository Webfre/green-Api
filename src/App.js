import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './components/Auth';
import './styles/app.scss';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.length > 1) {
      const idInstance = sessionStorage.getItem('idInstance');
      const apiToken = sessionStorage.getItem('apiToken');

      idInstance && apiToken ? navigate('/') : navigate('auth');
    } else {
      navigate('/auth');
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
}

export default App;