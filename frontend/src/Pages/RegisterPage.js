import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../Redux/userSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.warning("Please Enter all the fields");
    } else if (file) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "mern-auth");

      await axios
        .post("https://api.cloudinary.com/v1_1/decfyqe4w/upload", form)
        .then(async (res) => {
          const formValue = {
            name,
            email,
            password,
            image: res.data.url,
          };
          dispatch(register({ formValue, toast, navigate }));
        });
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Email"
            name="email"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Passsword</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            placeholder="Enter your password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="image">
          <Form.Label>Your Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account ? <Link to="/login">Login </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;
