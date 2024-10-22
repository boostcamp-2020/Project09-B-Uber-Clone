import createError from 'http-errors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import 'graphql-import-node';

import indexRouter from './routes/index';
import Models from './models';
import typeDefs from './graphql/schema/index.graphql';
import resolvers from './graphql/resolver';
import AuhtDirective from './graphql/schemaDirectives';
import { stream } from './config/winston';
import context from './graphql/context';
import { onConnect } from './graphql/onConnect';
import Config from './config';

const app: express.Application = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuhtDirective,
  },
  dataSources: () => Models,
  context,
  subscriptions: {
    onConnect,
  },
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
});

// view engine setup
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(Config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: Config.CLIENT_HOST, credentials: true }));

apolloServer.applyMiddleware({ app, path: '/graphql' });
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export { app, apolloServer };
