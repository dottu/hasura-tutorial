const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    hello:  String
  }
`;

const resolvers = {
    Query: {
        hello: () => "abc heleohelladslfagfhs",
    },
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: 4000}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

