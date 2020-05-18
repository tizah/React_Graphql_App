import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";

function Register(props) {
  const context = useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  };
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  //need to still examine what happened here regarding hoisting
  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register </h1>

        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          error={errors.username ? true : false}
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          type="email"
          error={errors.email ? true : false}
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          error={errors.password ? true : false}
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          error={errors.confirmPassword ? true : false}
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
