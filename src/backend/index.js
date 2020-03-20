const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const models = require('./models');
const bodyParser = require('body-parser');
const config = require('./config/server-config.json');
const rootRouter = require('./router/index')();
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
server.applyMiddleware({ app: app, path: '/graphql' });

models.connectDB().then(async () => {
  app.listen({ port: config.port }, () =>
    console.log(`Server Ready at http://localhost:${config.port}${server.graphqlPath}`)
  );
});