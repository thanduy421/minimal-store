import { apiUrls } from './data';
import { toast } from 'react-toastify';
import { customFetch } from './customAxios';
import { loginUser } from '../features/user/userSlice';

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);

  return dollarsAmount;
};

// create an sequential Array start at 1 with length n
export const generateSequentialArray = (n) => {
  return Array.from({ length: n }, (_, index) => index + 1);
};

export const loginAsGuestUser = async ({ dispatch, queryClient }) => {
  const demoUser = { identifier: 'test@test.com', password: 'secret' };
  const { loginUrl } = apiUrls;
  try {
    const response = await customFetch.post(loginUrl, demoUser);
    dispatch(loginUser(response.data));
    toast.success('logged in successfully');
    //remove query (clear cache)
    queryClient.removeQueries;
  } catch (err) {
    console.error(err);
    toast.error('login error. Please try again');
  }
};
