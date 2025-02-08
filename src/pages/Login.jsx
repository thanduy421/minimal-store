import { FormInput, SubmitBtn } from '../components';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { loginAsGuestUser } from '../utils/helperFuncs';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleGuestLogin = () => {
    loginAsGuestUser({ dispatch, queryClient });
    navigate('/');
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          className="btn btn-secondary btn-block"
          type="button"
          onClick={handleGuestLogin}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link to="/register" className="ml-2 link link-hover link-primary">
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
