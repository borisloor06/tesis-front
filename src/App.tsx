import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Landing';
import Register from './components/Register';
import './styles/global.css';
import Home from './components/App/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticación (por ejemplo, hacer una solicitud al servidor)
    // Si la autenticación es exitosa, establece isLoggedIn en true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setIsLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route
            path='/'
            element={
              isLoggedIn ? <Home /> : <Login handleLogin={handleLogin} />
            }
          />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
      {!isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
