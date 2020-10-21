import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form } from "react-bootstrap";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  fullName: yup.string().required(),
  gender: yup.mixed().oneOf(["Male", "Female"]).required(),
  phone: yup.string().min(7).max(14),
  address: yup.string().required(),
});

export default function App() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            placeholder="Email"
            type="email"
            name="email"
            ref={register}
          />
          <p>{errors.email?.message}</p>
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            ref={register}
          />
          <p>{errors.password?.message}</p>
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Full Name"
            type="text"
            name="fullName"
            ref={register}
          />
          {errors.fullName?.message}
        </Form.Group>
        <Form.Group>
          <Form.Control as="select" name="gender" ref={register}>
            <option>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Control>
          {errors.gender && <p>{errors.gender.message}</p>}
        </Form.Group>
        <Form.Group controlId="userPhone">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone"
            ref={register}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="address"
            placeholder="Address"
            ref={register}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </Form.Group>
        <button type="submit">Click</button>
      </Form>
    </Container>
  );
}
