import { PubSub } from 'apollo-server-express';
const pubsub = new PubSub();

const context = ({ req, res, connection }) => {
  if (!connection) {
    res.set('Access-Control-Allow-Origin', process.env.CLIENT_HOST);
    return { req, res, pubsub };
  }

  return { ...connection.context, pubsub };
};

export default context;
