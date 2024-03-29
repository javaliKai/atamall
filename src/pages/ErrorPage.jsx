import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <p>
        Code:{' '}
        <b>
          <i>{error.status || 'none'}</i>
        </b>
      </p>
      <p>
        Message: <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
