import { useRouteError,isRouteErrorResponse } from "react-router-dom";


const ErrorPage=()=>{
    const error=useRouteError();


    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you are looking for does not exist.";
    } else {
      message = error.statusText || message;
    }
  }

  return (
    <div style={styles.container}>
      <h1>{title}</h1>
      <p>{message}</p>
      <button onClick={() => window.location.href = "/"}>
        Go Home
      </button>
    </div>
  );



}

const styles = {
  container: {
    minHeight: "100vh",
    display: "grid",
    placeContent: "center",
    textAlign: "center",
  },
};

export default ErrorPage