import { Link } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header = ({ isLoggedIn, handleLogout }: HeaderProps) => {
  return (
    <nav className='navbar navbar-expand-lg bg-light border-bottom border-body pb-3'>
      <div className='container'>
        <div className='container-fluid'>
          <div className='d-flex'>
            <Link className='navbar-brand text-dark' to='/'>
              NLP
            </Link>
            {isLoggedIn && (
              <button
                className='navbar-toggler ms-auto'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon' />
              </button>
            )}
          </div>
          {isLoggedIn && (
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav ms-auto'>
                <button
                  className='nav-item btn btn-primary mx-auto ms-0 nav-link text-white'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
