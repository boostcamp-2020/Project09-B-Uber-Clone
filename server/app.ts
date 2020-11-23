import createError from 'http-errors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'graphql-import-node';

import indexRouter from './routes/index';
import Models from './models';
import typeDefs from './graphql/schema/index.graphql';
import mutation from './graphql/resolver/test';

const app: express.Application = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: mutation,
  dataSources: () => Models,
});

// view engine setup
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
apolloServer.applyMiddleware({ app, path: '/graphql' });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export { app, apolloServer };
