import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { logoutUser } from '../features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';
import { loginAsGuestUser } from '../utils/helperFuncs';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate('/');
    //remove query
    queryClient.removeQueries;
    dispatch(clearCart());
    dispatch(logoutUser());
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 items-center sm:gap-x-8">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-primary btn-outline"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <button
              className="link link-hover text-xs sm:text-sm"
              onClick={() =>
                loginAsGuestUser({ navigate, dispatch, queryClient })
              }
            >
              Login as Guest
            </button>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Sign in / Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
