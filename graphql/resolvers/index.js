const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const countriesResolvers = require("./countries");

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...countriesResolvers.Mutation,
    ...postsResolvers.Mutation
  }
};
