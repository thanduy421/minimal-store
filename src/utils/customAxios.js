import axios from 'axios';
import { apiUrls } from './data';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import { formatPrice } from './helperFuncs';

const apiUrl = import.meta.env.VITE_API_URL;

export const customFetch = axios.create({
  baseURL: apiUrl,
});

export const ordersLoader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const { orderUrl } = apiUrls;
    if (!user) {
      toast.warn('You must be logged in to checkout');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const ordersQuery = (queryParams, user) => {
      const { page = 1 } = queryParams;

      return {
        queryKey: ['allOrders', user.email, parseInt(page)],
        queryFn: () =>
          customFetch(orderUrl, {
            params: queryParams,
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }),
      };
    };

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        'Error happened. Please try again';
      toast.error(errorMsg);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect('/login');
      }
      return null;
    }
  };

export const checkoutAction =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const info = {
      data: {
        address,
        cartItems,
        chargeTotal: orderTotal,
        name,
        numItemsInCart,
        orderTotal: formatPrice(orderTotal),
      },
    };
    const { orderUrl } = apiUrls;
    try {
      await customFetch.post(orderUrl, info, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // remove query
      queryClient.removeQueries(['orders']);

      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (error) {
      console.error(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        'Error happened. Please try again';
      toast.error(errorMsg);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect('/login');
      }
      return null;
    }
  };

export const checkoutLoader = (store) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  } else {
    return null;
  }
};

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { registerUrl } = apiUrls;
  try {
    const response = await customFetch.post(registerUrl, data);
    toast.success('account created successfully');
    return redirect('/login');
  } catch (err) {
    const errorMessage =
      err?.response?.data?.error?.message ||
      'please double check your credentials';
    toast.error(errorMessage);
    return null;
  }
};

export const loginAction =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { loginUrl } = apiUrls;
    try {
      const response = await customFetch.post(loginUrl, data);
      store.dispatch(loginUser(response.data));
      toast.success('logged in successfully');
      return redirect('/');
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error?.message || 'login error. Please try again';
      toast.error(errorMessage);
      return null;
    }
  };

export const landingLoader = (queryClient) => async () => {
  const { featureProductsUrl } = apiUrls;
  const featuredProductsQuery = {
    queryKey: ['featuredProducts'],
    queryFn: () => customFetch(featureProductsUrl),
  };
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  // console.log(response);

  return { products: response.data.data };
};

export const singleProductLoader =
  (queryClient) =>
  async ({ params }) => {
    const { productsUrl } = apiUrls;
    const oneProductQuery = (id) => {
      return {
        queryKey: ['oneProduct', id],
        queryFn: () => customFetch(`${productsUrl}/${id ?? ''}`),
      };
    }; //if id is not provided, all products will be fetched. In this case, I'm using Nullish Coalescing Operator

    const { data } = await queryClient.ensureQueryData(
      oneProductQuery(params.id)
    );

    return { product: data.data, meta: data.meta };
  };

export const productsLoader =
  (queryClient) =>
  async ({ request }) => {
    const { productsUrl } = apiUrls;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const allProductsQuery = (queryParams) => {
      const { search, category, company, sort, price, shipping, page } =
        queryParams;

      return {
        queryKey: [
          'allProducts',
          search ?? '',
          category ?? 'all',
          company ?? 'all',
          sort ?? 'a-z',
          price ?? 100000,
          shipping ?? false,
          page ?? 1,
        ],
        queryFn: () => customFetch(productsUrl, { params: queryParams }),
      };
    };
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    return { products: response.data.data, meta: response.data.meta, params };
  };

export default customFetch;
