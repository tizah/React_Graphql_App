import React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data?.createPost, ...data.getPosts];
      //console.log(data.getPosts, " getPosts");
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post: </h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi, create a post"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ui className="list">
            {console.log(error.graphQLErrors[0].message, " error")}
            <li>{error.graphQLErrors[0].message}</li>
          </ui>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        createdAt
      }
    }
  }
`;
export default PostForm;
