import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);
  // state = {
  //   error: null
  // };

  // componentWillMount() {
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      // this.setState({ error: error });
    }
  );
  // }

  // componentWillUnmount() {
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  // }

  const errorConfirmedHandler = () => {
    setError(null);
    // this.setState({ error: null });
  };

  return [error, errorConfirmedHandler];
};
