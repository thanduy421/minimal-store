import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <section>
      <h4 className="font-bold text-4xl">
        There was an error. Sorry for your inconvenience
      </h4>
      <p className="mt-8">{error.data}</p>
    </section>
  );
};

export default ErrorElement;
