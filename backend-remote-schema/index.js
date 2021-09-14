const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    author:  String
    hello_id: Int
  }
`;

const resolvers = {
    Query: {
        author: () => "abc heleohelladslfagfhs",
        hello_id: () => 1
    },
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: 4000}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

