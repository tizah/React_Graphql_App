const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      try {
        if (body.trim() === "") {
          throw new Error("Post body must not be empty");
        }

        const newPost = new Post({
          body,
          createdAt: new Date().toISOString(),
          username: user.username,
          user: user.id,
        });

        const post = await newPost.save();
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();
          return "Post deleted Successfully";
        } else {
          throw new Error("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
      //const post = await Post().findById(postId);
    },

    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      try {
        if (body.trim() === "") {
          throw new UserInputError("Empty comment", {
            errors: {
              body: "Comment body must not be empty",
            },
          });
        }
        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({
            username,
            body,
            createdAt: new Date().toISOString(),
          });

          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        console.log(commentIndex);
        if (user.username === post.comments[commentIndex].username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new Error("Action not allowed");
        }
      }
    },

    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new Error("post not found");
      }
    },
  },
};
