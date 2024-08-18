import React, { useState } from 'react';
import { Container, Logo } from '../index.js';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "MyPost", slug: "/my-post", active: authStatus },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) =>
        item.active ? (
          <li key={item.name}>
            <NavLink
              to={item.slug}
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 bg-red-700 rounded-full text-white'
                  : 'px-4 py-2 text-gray-200 hover:bg-red-600 rounded-full transition duration-300'
              }
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
              })}
              onClick={() => setIsOpen(false)} // Close menu on mobile when a link is clicked
            >
              {item.name}
            </NavLink>
          </li>
        ) : null
      )}
      {authStatus && (
        <li>
          <LogoutButton />
        </li>
      )}
    </>
  );

  return (
    <header className='bg-red-500 shadow-md text-white w-screen'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <NavLink to='/'>
          <Logo width='60px' />
        </NavLink>
        <button
          className='block md:hidden focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
        <ul className={`hidden md:flex items-center space-x-4`}>
          {renderNavItems()}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden'>
          <ul className='flex flex-col items-center space-y-4'>
            {renderNavItems()}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
