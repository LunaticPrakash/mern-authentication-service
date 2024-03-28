import React, { useEffect } from 'react'
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import * as Yup from 'yup';
import * as formik from 'formik';
import { ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, loginUser } from '../redux/actions/userActions';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const LoginPage = () => {

    const { Formik } = formik;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: ""
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required("Email is required!"),
        password: Yup.string()
            .min(3, "Password is short. It should have minimum 3 characters")
            .required("Password is required!")
    });

    const loginFormSubmitHandler = (values) => {
        Swal.fire({
            title: 'Login in...',
            showCancelButton: false,
            showConfirmButton: false
        });
        loginUser(dispatch, values.email, values.password).then((data) => {
            if (data.type === "user/loginError") {
                Swal.close();
                Swal.fire({
                    title: "Login Failed!",
                    text: `Error: ${data.payload.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    toast: true,
                    animation: false,
                    position: 'bottom',
                    timer: 3000,
                    timerProgressBar: true,
                    closeOnCancel: true
                });
            }
            else if (data.type === "user/loginSuccess") {
                Swal.close();
                Swal.fire({
                    title: "Login Successfull!",
                    text: `${data.payload.firstName} is succesfully logged in.`,
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    toast: true,
                    position: 'bottom',
                    allowEscapeKey: true,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('click', () => Swal.close())
                    }
                });
                navigate("/home");
            }
        });
    }

    useEffect(() => {
        getUserProfile(dispatch).then((data) => {
            if (data.type === "user/getUserProfileSuccess") {
                navigate("/home");
            }
        });
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => {
                loginFormSubmitHandler(values);
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <Container fluid>
                    <Row className="my-5 justify-content-center">
                        <Col lg={5} md={7} sm={10} xs={11}>
                            <h2 className="text-center">Sign In</h2>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"
                                    controlId="formBasicEmail">
                                    <Form.Label className='mb-2'>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        autoComplete='off'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        className={`${errors.email && touched.email ?
                                            "input-error" : null} p-1`}
                                    />
                                    <ErrorMessage name="email" component="span" className="error" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className='mb-2'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        className={`${errors.password && touched.password ?
                                            "input-error" : null} p-1`}
                                    />
                                    <ErrorMessage name="password" component="span" className="error" />
                                </Form.Group>
                                <p onClick={() => { navigate("/register") }} role="button" className="text-primary">Don't have an account? Register Here</p>
                                <Button variant="primary px-3 py-1 my-3" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container >
            )}
        </Formik >
    );
}

export default LoginPage;