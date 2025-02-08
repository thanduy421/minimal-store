import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10">
            <Link to="/" className="btn btn-secondary uppercase">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="font-bold text-4xl">
        There was an error. Sorry for your inconvenience
      </h4>
    </main>
  );
};
export default Error;
