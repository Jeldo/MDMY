const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const models = require('./models');
const bodyParser = require('body-parser');
const config = require('./config/server_config.json');
const rootRouter = require('./router/index')();
const graphqlRouter = require('./router/graphql')();
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api', rootRouter);
app.use('/api/graphql', graphqlRouter);

models.connectDB().then(async () => {
  app.listen({ port: config.port }, () =>
    console.log('Now browse to http://localhost:' + config.port + server.graphqlPath)
  );
});