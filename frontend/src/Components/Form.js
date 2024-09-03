import { useFormik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, Form}  from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  // BEGIN (write your solution here) const auth = useAuth();
    const auth = useAuth();
    const [authFailed, setAuthFailed] = useState(false);
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      inputRef.current.focus();
    }, []);
  
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: async (values) => {
        setAuthFailed(false);
  
        try {
          const res = await axios.post(routes.loginPath(), values);
          localStorage.setItem('userId', JSON.stringify(res.data));
          auth.logIn();
          const { from } = location.state;
          console.log(location.state)
          navigate(from);
        } catch (err) {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw err;
        }
      },
    });
  
    return (
      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="col-sm-4">
            <Form onSubmit={formik.handleSubmit} className="p-3">
              <fieldset>
                <Form.Group>
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-primary">Submit</Button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    );
  // END
  };
  
  export default LoginPage;
