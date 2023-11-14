// Home.tsx
import { useState } from 'react';
import Navbar from '../Header/Navbar';
import Index from './Index';
import IndexTwo from './IndexTwo';

function Home() {
  const [currentTab, setCurrentTab] = useState('Inicio');

  const renderTab = () => {
    switch (currentTab) {
      case 'Inicio':
        return <Index />;
      case 'InicioTwo':
        return <IndexTwo />;
      default:
        return <Index />;
    }
  };

  return (
    <div>
      <Navbar setCurrentTab={setCurrentTab} />
      {renderTab()}
    </div>
  );
}

export default Home;
