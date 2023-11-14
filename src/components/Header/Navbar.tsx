import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/app.css';

interface NavbarProps {
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentTab }) => {
  const [currentTabName, setCurrentTabName] = useState('Inicio');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      setIsNavCollapsed(true);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    setCurrentTabName(tab);
    if (isMobileView) {
      setIsNavCollapsed(true);
    }
  };

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className='navbar navbar-expand-lg purplePrimary'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo03'
          aria-controls='navbarTogglerDemo03'
          aria-expanded={!isNavCollapsed}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        {isMobileView && <h3 className='navbar-brand'>{currentTabName}</h3>}
        <div
          className={`collapse navbar-collapse${isNavCollapsed ? '' : ' show'}`}
          id='navbarTogglerDemo03'
        >
          <ul className='navbar-nav nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                to='/'
                className='navBar nav-link'
                onClick={() => {
                  handleTabClick('Inicio');
                  handleNavToggle();
                }}
              >
                Inicio
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='navBar nav-link'
                onClick={() => {
                  handleTabClick('InicioTwo');
                  handleNavToggle();
                }}
              >
                Inicio 2
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='navBar nav-link'
                onClick={() => {
                  handleTabClick('InicioThree');
                  handleNavToggle();
                }}
              >
                Inicio 3
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='navBar nav-link'
                onClick={() => handleTabClick('InicioFour')}
              >
                Inicio 4
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
