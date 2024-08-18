import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/AuthSlice';
import authorization from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    try {
      await authorization.logout();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      className="
        px-4 py-2 text-gray-200 hover:bg-blue-600 rounded-full transition duration-300"
      onClick={onClickHandler}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
