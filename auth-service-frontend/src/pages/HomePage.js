import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from "react-bootstrap";
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../redux/actions/userActions';

const HomePage = () => {
    const userReducer = useSelector((state) => state.user);
    const [user, setUser] = useState(userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <Container>
            <Row className="my-3 justify-content-center">
                <Col lg={5} md={10} xs={12}>
                    <h1 className="text-center">
                        {`Hello ${user && user.firstName}!`}
                    </h1>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage