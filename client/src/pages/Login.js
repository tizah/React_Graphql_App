import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
  };
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
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
          label="Password"
          placeholder="Password"
          type="password"
          error={errors.password ? true : false}
          name="password"
          value={values.password}
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

const LOGIN_USER = gql`
  mutation register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Login;
