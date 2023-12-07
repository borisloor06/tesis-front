import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Landing from './components/Landing';
import './styles/global.css';
import Home from './components/Home';

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
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route
            path='/'
            element={
              isLoggedIn ? <Home /> : <Landing handleLogin={handleLogin} />
            }
          />
        </Routes>
      </BrowserRouter>
      {!isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
