import React from 'react'
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import * as Yup from 'yup';
import * as formik from 'formik';
import { ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { Formik } = formik;
    const navigate = useNavigate();

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
        console.log(values);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => {
                loginFormSubmitHandler(values);
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <Container>
                    <Row className="my-5 justify-content-center">
                        <Col lg={5} md={10} xs={12}>
                            <h2 className="text-center">Sign In</h2>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"
                                    controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        className={errors.email && touched.email ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="email" component="span" className="error" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        className={errors.password && touched.password ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="password" component="span" className="error" />
                                </Form.Group>
                                <p onClick={() => { navigate("/register")}} role="button" className="text-primary">Don't have an account? Register Here</p>
                                <Button variant="primary" type="submit">
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