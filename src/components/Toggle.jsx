import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';

const Toggle = () => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onChange={handleTheme} />

        <BsSunFill className="swap-on h-4 w-4" />
        <BsMoonFill className="swap-off h-4 w-4" />
      </label>
    </>
  );
};

export default Toggle;
