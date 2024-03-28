import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getUserProfile, logoutUser } from '../redux/actions/userActions';
import Swal from 'sweetalert2';
import "./ProfilePage.css";
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as formik from 'formik';
import { ErrorMessage } from 'formik';

const ProfilePage = () => {
    const userReducer = useSelector((state) => state.user);
    const [user, setUser] = useState(userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { Formik } = formik;

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: ""
    }

    const userSchema = Yup.object().shape({
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

    const logoutHandler = () => {
        Swal.fire({
            title: 'Login out...',
            showCancelButton: false,
            showConfirmButton: false
        });
        logoutUser(dispatch).then((data) => {
            if (data.type === "user/logoutUserError") {
                Swal.close();
                Swal.fire({
                    title: "Logout Failed!",
                    text: `User is not logged out yet. Error : ${data.payload.message}`,
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
            else if (data.type === "user/logoutUserSuccess") {
                Swal.close();
                Swal.fire({
                    title: "Logout Successfully!",
                    text: `${user.firstName} is logged out`,
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    toast: true,
                    position: 'bottom',
                    allowEscapeKey: true,
                    timer: 3000,
                    timerProgressBar: true,
                });
                navigate("/login");
            }
        });
    }

    const updateUserHandler = (values) => {
        console.log(values);
    }

    useEffect(() => {
        getUserProfile(dispatch).then((data) => {
            if (data.type === "user/getUserProfileError") {
                navigate("/login");
            }
            else if (data.type === "user/getUserProfileSuccess") {
                const t = data.payload;
                setUser(t);
            }
        });
    }, []);

    return (
        user ?
            (
                <div className="profilepage">
                    <p style={{ fontSize: "1.5rem", color: "black", margin: "10px" }}>
                        Profile
                    </p>
                    <div className="profilepage__container">
                        <div className='card profilepage__container__first-col'>
                            <Card className='align-items-center'>
                                <img src="res/user.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                <Card.Body>
                                    <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                                    <Card.Text className='text-muted'>
                                        Jr. Software Engineer
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="profilepage__container__second-col">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={userSchema}
                                onSubmit={(values) => {
                                    updateUserHandler(values);
                                }}
                            >
                                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                                    <div className='card'>
                                        <Form noValidate onSubmit={handleSubmit} className='profilepage__container__second-col__form'>
                                            <Form.Group className="d-flex card-body"
                                                controlId="formBasicEmail">
                                                <Row>
                                                    <Col sm={3}>
                                                        <Form.Label className='mb-2 h6'>Email</Form.Label>
                                                    </Col>
                                                    <Col sm={9}>
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
                                                    </Col>
                                                </Row>
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
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div >
                </div >) : (<h1>Loading</h1>)
    )
}

export default ProfilePage