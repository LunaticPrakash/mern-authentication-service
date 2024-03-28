import React, { useEffect } from 'react'
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import * as Yup from 'yup';
import * as formik from 'formik';
import { ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, registerUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import axios from 'axios';

const RegisterPage = () => {

    const { Formik } = formik;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: ""
    }

    const registerSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(50, "Only 50 characters are allowed!")
            .required("First Name is required!"),
        lastName: Yup.string()
            .max(50, "Only 50 characters are allowed!")
            .required("Last Name is required!"),
        email: Yup.string()
            .email()
            .required("Email is required!"),
        mobileNumber: Yup.string()
            .required("Mobile Number is required")
            .matches(
                /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/g,
                "Invalid phone number"),
        password: Yup.string()
            .min(3, "Password is short. It should have minimum 3 characters")
            .required("Password is required!")
    });

    const registerFormSubmitHandler = (values) => {
        Swal.fire({
            title: 'Registering...',
            showCancelButton: false,
            showConfirmButton: false
        });
        registerUser(dispatch, values).then((data) => {
            if (data.type === "user/registerError") {
                Swal.close();
                Swal.fire({
                    title: "Registration Failed!",
                    text: `User is not registered yet. Error : ${data.payload.message}`,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    toast: true,
                    position: 'bottom',
                    allowEscapeKey: true,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
            else if (data.type === "user/registerSuccess") {
                Swal.close();
                Swal.fire({
                    title: "Registeration Successfull!",
                    text: `${data.payload.firstName} is succesfully registered.`,
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
            validationSchema={registerSchema}
            onSubmit={(values) => {
                registerFormSubmitHandler(values);
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (

                <Container>
                    <Row className="my-3 justify-content-center">
                        <Col lg={5} md={7} sm={10} xs={11}>
                            <h2 className="text-center">Sign Up</h2>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label className='mb-2'>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.firstName && !errors.firstName}
                                        className={`${errors.firstName && touched.firstName ?
                                            "input-error" : null} p-1`}
                                    />
                                    <ErrorMessage name="firstName" component="span" className="error" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label className='mb-2'>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.lastName && !errors.lastName}
                                        className={`${errors.lastName && touched.lastName ?
                                            "input-error" : null} p-1`}
                                    />
                                    <ErrorMessage name="lastName" component="span" className="error" />
                                </Form.Group>
                                <Form.Group className="mb-3"
                                    controlId="formBasicEmail">
                                    <Form.Label className='mb-2'>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        className={`${errors.email && touched.email ?
                                            "input-error" : null} p-1`}
                                    />
                                    <ErrorMessage name="email" component="span" className="error" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                                    <Form.Label className='mb-2'>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobileNumber"
                                        value={values.mobileNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.mobileNumber && !errors.mobileNumber}
                                        className={`${errors.mobileNumber && touched.mobileNumber ?
                                            "input-error" : null} p-1`}
                                    />
                                    <ErrorMessage name="mobileNumber" component="span" className="error" />
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
                                <p onClick={() => { navigate("/login") }} role="button" className="text-primary">Already have an account? Login Here</p>
                                <Button variant="primary px-3 py-1 my-3" type="submit">
                                    Register
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            )}
        </Formik >)
}

export default RegisterPage