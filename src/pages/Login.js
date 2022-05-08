import React, {useEffect, useState} from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Checkbox from "@material-tailwind/react/Checkbox";
import Button from "@material-tailwind/react/Button";
import DefaultNavbar from "components/DefaultNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";
import {URL, baseURL} from "./../utils/constanta";
import axios from "axios";
import apiClient from "../utils/api";
import {useHistory} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState({value: "", error: ""});
    const [password, setPassword] = useState({value: "", error: ""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    const authCheck = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            console.log("loggedin");
            history.push("/");
        }
    };

    const login = async () => {
        console.log(email);
        console.log(password);
        apiClient.get("/sanctum/csrf-cookie").then((response) => {
            apiClient
                .post(
                    "api/v1/login",
                    {
                        email: email.value,
                        password: password.value,
                    },
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem("token", response.data.access_token);
                    history.push("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    const checkConnection = () => {
        axios
            .get(URL + "test/connection")
            .then(function (response) {
                if (response.data.status) {
                    console.log(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        authCheck();
        checkConnection();
    }, []);

    return (
        <Page>
            <DefaultNavbar />
            <Container>
                <Card>
                    <CardHeader color="lightBlue">
                        <H5 color="white" style={{marginBottom: 0}}>
                            Login
                        </H5>
                    </CardHeader>

                    <CardBody>
                        <div className="mb-12 px-4 bg-bb">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                iconName="email"
                                onChange={(event) =>
                                    setEmail({value: event.target.value})
                                }
                                value={email.value}
                            />
                        </div>
                        <div className="mb-8 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Password"
                                iconName="lock"
                                onChange={(event) =>
                                    setPassword({value: event.target.value})
                                }
                                value={password.value}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <Checkbox
                                color="lightBlue"
                                text="Remember Me"
                                id="remember"
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center bg-bb">
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="lg"
                                ripple="dark"
                                onClick={login}
                            >
                                Login
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
            <SimpleFooter />
        </Page>
    );
}
