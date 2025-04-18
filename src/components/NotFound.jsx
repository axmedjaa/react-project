import { useRouteError } from "react-router";

const NotFound = () => {
  const error = useRouteError()

  return (
    <div>
      <h2>Error</h2>
      <p>{error.statusText || error.message}</p>
      <p>Sorry, this page does not exist.</p>
    </div>
  );
};

export default NotFound;