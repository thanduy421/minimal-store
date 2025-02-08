import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
  cupcake: 'cupcake',
  night: 'night',
  fantasy:'fantasy',
};

const getInitialTheme = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('theme') === themes.night;

  if (storedDarkMode || prefersDarkMode) {
    return themes.night;
  }

  return themes.fantasy;
};

const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getInitialTheme(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out');
    },
    toggleTheme: (state) => {
      const { fantasy, night } = themes;
      const newThemeName = state.theme === fantasy ? night : fantasy;
      document.documentElement.setAttribute('data-theme', newThemeName);
      localStorage.setItem('theme', newThemeName);

      return { ...state, theme: newThemeName };
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
