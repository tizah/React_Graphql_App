import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";

import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

import PostForm from "../components/PostForm";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">Recent Posts</Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
