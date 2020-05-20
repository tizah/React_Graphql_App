import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon, Label, Button } from "semantic-ui-react";

function LikeButton({ post: { id, likeCount, likes }, user }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => likes.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label as="a" basic color="teal" pointing="left">
        {likes.length}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likPost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      createdAt
      likes {
        id
        username
      }
    }
  }
`;

export default LikeButton;
