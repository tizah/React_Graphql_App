const { UserInputError } = require("apollo-server");

const Country = require("../../models/Country");

module.exports = {
  Mutation: {
    async addCountry(_, { name }) {
      const newCountry = new Country({
        name
      });

      const country = await Country.findOne({ name });
      if (country) {
        throw new UserInputError("Country Already Exist", {
          error: {
            name: "this name is already in our records"
          }
        });
      }
      const res = await newCountry.save();
      return { name };
    }
  }
};
