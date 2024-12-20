import { useEffect, useRef } from 'react';
import Login from '../Login';

const LoginPage = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Login inputRef={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
